import { useState, useEffect } from 'react';
import axios from 'axios';
import useApplicationData from '../../hooks/useApplicationData';

import Button from '../shared/Button';
import List from '../shared/ListWithEditDelete';
import TogglingEditForm from '../shared/TogglingEditForm';

export default function EditCategories(props) {
  const { state } = useApplicationData();
  //state for the form toggled by 'Add category'
  const [showForm, setShowForm] = useState(false);
  //state for the Add category input
  const [newCat, setNewCat] = useState("");
  //state for the alert showing user they created the category
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = (name) => {

    setShowForm(false);
    setShowAlert(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleDelete = () => {

    //send data to back-end
    return axios.post('http://localhost:3001/api/categories', { newCatName: newCat })
      .then(response => {
          console.log('client says: cat name sent');
          console.log(response.data);
      })
      .catch(err => { console.log('error:', err) })

  };

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
      {showAlert && (
        <div>Successfully created!</div>
      )}
      <br /><br />
      <List
        fromCateg={true}
        onDelete={handleDelete}
        categ={state.categories}
      />      
      {/* {submitted && (
        <div className="List">
          {newCat} <Button>Edit</Button><Button>Delete</Button>
        </div>
      )} */}
    </div>
  );
}