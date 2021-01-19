import { useState } from 'react';

import Button from '../shared/Button';
import List from '../shared/ListWithEditDelete';
import TogglingEditForm from '../shared/TogglingEditForm';

export default function EditCategories(props) {

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="EditCategories">
      <h4>Edit categories</h4>
      <Button onClick={() => setShowForm(true)}>Add category</Button>
      <Button onClick={props.onBack}>Back</Button>
      <br/><br/>

      {showForm && 
        <TogglingEditForm onSave={props.onSave} onCancel={() => setShowForm(false)} />
      }

      <br/><br/>
      <List 
        onCateg={true}
        onDelete={() => console.log('delete clicked')}
      >
        {props.children}
      </List>
    </div>
  );
}