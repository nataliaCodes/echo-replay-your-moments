import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import useApplicationData from '../../hooks/useApplicationData';

import Button from '../shared/Button';
import List from '../shared/ListWithEditDelete';
import TogglingEditForm from '../shared/TogglingEditForm';

export default function EditCategories(props) {

  //getting categories info from state
  const { state, setState, cookies } = useApplicationData();

  //state for the form toggled by 'Add category'
  const [showForm, setShowForm] = useState(false);

  //state for the Add category input
  const [newCat, setNewCat] = useState("");

  //state for the alert showing user they created the category
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = (newCateg) => {

    setShowForm(false);
    setShowAlert(true);

    const userId = cookies.user;

    //send data to back-end
    return axios.post('http://localhost:3001/api/categories', { newCateg, userId })
      .then(response => {
        console.log('response for express:', response.data);

        //create shallow copy of state categories
        const categ = [...state.categories];
        categ.push(newCateg);
        console.log('categ :', categ);

        setState({...state, categories: categ})
      })
      .catch(err => { console.log('error:', err) })
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div className="EditCategories">
      <h4>Edit categories</h4>
      <Button onClick={() => setShowForm(true)}>Add category</Button>
      <Button onClick={props.onBack}>Back</Button>
      <br /><br />
      {showForm && (
        <TogglingEditForm
          placeholder="Insert category name"
          name="new-category"
          onChange={(e) => setNewCat(e.target.value)}
          onSave={() => handleSave(newCat)}
          onCancel={() => setShowForm(false)}
        />
      )}
      <Alert show={showAlert} variant="success" style={{width: "20em"}}>
        Successfully created!
      </Alert>
      <br /><br />
      <List
        fromCateg={true}
      />      
    </div>
  );
}