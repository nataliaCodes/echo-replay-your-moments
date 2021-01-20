import { useState } from 'react';

import Button from '../shared/Button';
import List from '../shared/ListWithEditDelete';
import TogglingEditForm from '../shared/TogglingEditForm';
import Alert from '../shared/Alert';

export default function EditCategories(props) {

  const [ showForm, setShowForm ] = useState(false);
  const [ newCat, setNewCat ] = useState("");
  const [ show, setShow ] = useState(false);

  const handleSave = (name) => {

    console.log('save clicked, new name:', name);
    setShowForm(false);
    setShow(true);
  };

  return (
    <div className="EditCategories">
      <h4>Edit categories</h4>
      <Button onClick={() => setShowForm(true)}>Add category</Button>
      <Button onClick={props.onBack}>Back</Button>
      <br/><br/>

      {showForm && (
        <TogglingEditForm 
          placeholder="Insert category name"
          name="new-category"
          onChange={(e) => setNewCat(e.target.value)}
          onSave={() => handleSave(newCat)}
          onCancel={() => setShowForm(false)}
        />
      )}

      {newCat && (
        <Alert />
      )}

      <br/><br/>
      <List 
        onCateg={true}
        onDelete={() => console.log('delete clicked')}
      >
        {props.children}
      </List>
      {newCat && (
        <div className="List">
          {newCat} <Button>Edit</Button><Button>Delete</Button>
        </div>
      )}
    </div>
  );
}