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
    password: ''
  });
  console.log('[DBG][line:18][file:useApplicationData] useApplicationData - setState');
  //extracts all users from the DB
  useEffect(() => {

    //promise.all to include any future data calls we will need
    Promise.all([
      axios.get('api/users')

    ])
    .then(all => {

      console.log('[DBG][line:29][file:useApplicationData] - axios get done');
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
    const { firstName, lastName, email, password } = state;
    console.log('[DBG][line:59][file:useApplicationData] handleSubmit');

    if (!firstName || !lastName || ! email || !password) {
      alert('Field cannot be empty!');
    }

    //build new user to send to back-end
    const newUser = {
      firstName,
      lastName,
      email,
      password
    };

    //how to handle empty fields??? axios call goes through with empty values

    return axios.post('http://localhost:3001/register', { newUser })
      .then(response => {
        setState({ serial: "" });
        console.log('[DBG][line:70][file:useApplicationData] data sent');
        resolve('data sent');
      })
      .catch(err => {console.log(err)})

  }
  
  return { state, handleFormChange, handleSubmit }

};

export default useApplicationData;