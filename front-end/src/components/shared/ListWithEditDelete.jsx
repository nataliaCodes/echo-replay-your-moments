import { useState } from 'react';

import useApplicationData from '../../hooks/useApplicationData';

import Button from './Button';
import TogglingEditForm from './TogglingEditForm';

export default function List(props) {

  //using app data state to get categories
  const { state } = useApplicationData();
  const categories = state.categories;

  //keeping edit form state local to avoid too much rendering
  const [ catName, setCatName ] = useState("");
  const [ editMode, setEditMode ] = useState(null);

  const setMode = (i, cat) => {
    setEditMode(i);
    setCatName(cat);
  };

  const categoriesList = categories && categories.map((cat, i) => {

    return (
      <div key={i}>
        {/* show category name when edit mode is not active for current element */}
        {editMode !== i && cat}
        {/* on edit mode active for current element show edit form */}
        {editMode === i ? (
          <TogglingEditForm 
            onCancel={() => setEditMode(null)} 
            onSave={() => console.log('edit save clicked, send new category to DB')}
            value={catName}
            name="cat-name"
            placeholder="Category name"
            onChange={(e) => setCatName(e.target.value)}
          />
        ) :
          // else show the buttons
          (<>
            <Button onClick={() => setMode(i, cat)}>Edit</Button>
            <Button onClick={props.onDelete}>Delete</Button>
          </>)
        }
      </div>
    );

  });

  return (
    // list component is being used in two different pages, render accordingly
    <div className="List">
      {props.fromCateg &&
      <div>
        {categoriesList}
      </div>
      }
      {props.onVideos &&
      <ul>
        <li>Moment 1 <Button>Edit</Button><Button>Delete</Button></li>
        <li>Moment 2 <Button>Edit</Button><Button>Delete</Button></li>
        <li>Moment 3 <Button>Edit</Button><Button>Delete</Button></li>
      </ul>
      }
    </div>
  );
}