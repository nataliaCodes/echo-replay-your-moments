import {
  useState,
  useEffect
} from 'react';

import axios from 'axios';

const useApplicationData = () => {

  //initial state
  const [state, setState] = useState({
    users: []
  });

  //extracts all users from the DB
  useEffect(() => {

    //promise.all to include any future data calls we will need
    Promise.all([
      axios.get('api/users')

    ])
    .then(all => {

      console.log('axios done')
      //all comes back as an array of responses from the axios calls
      console.log(all[0].data)
      setState(prev => ({...prev, users: all[0].data }))
      
    })
    .catch((err) => console.log(err));

  }, []);

  return { state }

};

export default useApplicationData;