import { useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Button from '../shared/Button';
import List from '../shared/ListWithEditDelete';

export default function EditCategories(props) {

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="EditCategories">
      <h4>Edit categories</h4>
      <Button onClick={() => setShowForm(true)}>Add category</Button>
      <Button onClick={props.onBack}>Back</Button>
      <br/><br/>

      {showForm && 
      <InputGroup className="mb-3" style={{width: "30%"}}>
        <FormControl
          placeholder="Category name"
          aria-label="Category name"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={props.onSave}>Save</Button>
          <Button variant="outline-secondary" onClick={() => setShowForm(false)}>Cancel</Button>
        </InputGroup.Append>
      </InputGroup>
      }

      <br/><br/>
      <List 
        onCateg={true}
        onEdit={() => console.log('edit clicked')}
        onDelete={() => console.log('delete clicked')}
      >
        {props.children}
      </List>
    </div>
  );
}