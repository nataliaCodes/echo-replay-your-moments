import {
  useState,
  useEffect
} from 'react';

import axios from 'axios';

const useApplicationData = () => {

  //initial state
  const [state, setState] = useState({
    users: [],
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: '',
    redirect: null
  });

  //extracts all users from the DB
  useEffect(() => {

    //promise.all to include any future data calls we will need
    Promise.all([
      axios.get('api/users')

    ])
    .then(all => {

      //'all' comes back as an array of responses from the axios calls
      console.log(all[0].data)
      
      //set current state with axios calls data
      setState(prev => ({...prev, users: all[0].data }))
      
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

  const handleSubmit = () => {
    
    //deconstruct values needed from state
    const { firstName, lastName, email, password, errors } = state;
    let validForm = true;
    
    //if any of the inputs are empty, set error state
    if (!firstName || !lastName || ! email || !password) {

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
              setState({...state, redirect: '/videos'});
            }
        })
        .catch(err => {console.log(err)})
    }
  }
  
  return { state, handleFormChange, handleSubmit }

};

export default useApplicationData;