import {
  useState,
  useEffect
} from 'react';

//use cookies hook
import { useCookies } from "react-cookie";

import axios from 'axios';

import youtubeApi from '../api/youtube';

const useApplicationData = () => {

  //initial state
  const [state, setState] = useState({
    users: [],
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
    redirect: null,
    videoMetaInfo:[],
    selectedVideoID:null,
    startTime: 70,
    endTime: 2222,
    loop:0
  });

  //set initial cookie
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  //extracts all users from the DB
  useEffect(() => {

    //promise.all to include any future data calls we will need
    Promise.all([
      axios.get('api/users'),
      axios.get('api/categories')
    ])
    .then(all => {

      //'all' comes back as an array of responses from the axios calls
      console.log('users:', all[0].data)
      console.log('categories:', all[1].data)
      
      //set current state with axios calls data
      setState(prev => ({...prev, users: all[0].data, categories: all[1].data }))
      
    })
    .catch((err) => console.log(err));

  }, []);

  const handleFormChange = event => {

    const input = event.target.value;
    const fieldName = event.target.name;

    setState({
      ...state,
      [fieldName]: input
    });

  };

  const handleRegisterSubmit = () => {
    
    //deconstruct values needed from state
    const { firstName, lastName, email, password, errors } = state;
    let validForm = true;
    
    //if any of the inputs are empty, set error state
    if (!firstName || !lastName || !email || !password) {

      validForm = false;
      setState({...state, error: 'Fields cannot be empty!'});

    }

    if (validForm) {
      //reset error state
      setState({...state, error: ''});

      //build input object to send to back-end
      const userInput = {
        firstName,
        lastName,
        email,
        password
      };

      //send data to back-end
      return axios.post('http://localhost:3001/register', { userInput })
        .then(response => {

            //if server sends response.msg, user exists in DB
            const userExists = response.data.msg

            //if user exists set state error
            if (userExists) {
              setState({...state, error: userExists});

            } else {
              console.log('user created, id:', response.data.id);
              setCookie("user", response.data.id, {
                path: "/"
              });
              setState({...state, redirect: '/'});
            }
        })
        .catch(err => {console.log(err)})
    }
  }

  const handleLoginSubmit = () => {
    
    //deconstruct values needed from state
    const { email, password } = state;
    let validForm = true;
    
    //if any of the inputs are empty, set error state
    if (!email || !password) {

      validForm = false;
      setState({...state, error: 'Fields cannot be empty!'});

    }

    if (validForm) {
      //reset error state
      setState({...state, error: ''});

      //build input object to send to back-end
      const loginInput = {
        email,
        password
      };

      //send data to back-end
      return axios.post('http://localhost:3001/login', { loginInput })
        .then(response => {

            //if server sends response.msg, user exists in DB
            const noUser = response.data.msg

            //if user exists set state error
            if (noUser) {
              setState({...state, error: noUser});

            } else {

              console.log('user logged in, id:', response.data.id);
              setCookie("user", response.data.id, {
                path: "/"
              });
              setState({...state, redirect: '/'});
            }
        })
        .catch(err => {console.log('error:', err)})
    }
  }

  const handleLogout = () => {
    //reset cookie when user logs out
    removeCookie("user", { path: "/"});
    console.log('user logged out');
  }

  const onVideoSelected = videoId => {
    setState({
      ...state,
      selectedVideoID:videoId
    })
  }

  const onSearch = async keyword => {
    const response = await youtubeApi.get("/search",{
      params:{
        q:keyword
      }
    })

    console.log(response.data)

    setState({
      ...state,
      videoMetaInfo: response.data.items,
      selectedVideoID: response.data.items[0].id.videoId
    })

    console.log(state)
  }


  // const onSearchChanged = event => {
  //   const _title = event.target.value

  //   console.log(_title)

  //   setState({...state, title:_title})
  // }

  // const onSubmit = event => {
  //   event.preventDefault()

  //   console.log(state.title)

  //   onSearch(state.title)
  // }

  const onMinChange = (e) => {
    setState({
      startTime: +e.target.value || 0,
    });
  };
  
  const onMaxChange = (e) => {
    setState({
      endTime: +e.target.value || 100,
    });
  };
  
  return { state, handleFormChange, handleRegisterSubmit, handleLoginSubmit, onVideoSelected, onSearch, handleLogout, onMinChange, onMaxChange }

};

export default useApplicationData;