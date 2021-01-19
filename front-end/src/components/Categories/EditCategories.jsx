import { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Button from '../shared/Button';
import List from '../shared/ListWithEditDelete';

import useApplicationData from '../../hooks/useApplicationData';

export default function EditCategories(props) {

  const [showForm, setShowForm] = useState(false);
  const { state } = useApplicationData();

  const categories = state.categories;
  const categoriesList = categories && categories.map((cat, i) => {

    return <li key={i}>{cat} <Button>Edit</Button><Button>Delete</Button></li>

  });

  const handleClick = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);
  const handleSave = () => console.log('save clicked, send new category to DB');

  return (
    <div className="EditCategories">
      <h4>Edit categories</h4>
      <Button onClick={handleClick}>Add category</Button>
      <br/><br/>

      {showForm && 
      <InputGroup className="mb-3" style={{width: "30%"}}>
        <FormControl
          placeholder="Category name"
          aria-label="Category name"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleSave}>Save</Button>
          <Button variant="outline-secondary" onClick={handleCancel}>Cancel</Button>
        </InputGroup.Append>
      </InputGroup>
      }

      <br/><br/>
      <ul>{categoriesList}</ul>
      {/* <List>
        Categories
      </List> */}
    </div>
  );
}