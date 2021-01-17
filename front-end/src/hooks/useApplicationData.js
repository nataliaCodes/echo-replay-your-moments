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

  //extracts all users from the DB
  useEffect(() => {

    //promise.all to include any future data calls we will need
    Promise.all([
      axios.get('api/users')

    ])
    .then(all => {

      console.log('axios done')
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
    
    //build new user to send to back-end
    const newUser = {
      firstName,
      lastName,
      email,
      password
    };

    return axios.post('http://localhost:3001/api/users', { newUser })
      .then(() => {
        console.log('data sent');
      })
      .catch(err => {console.log(err)});


    console.log(newUser);
    
  }

  return { state, handleFormChange, handleSubmit }

};

export default useApplicationData;