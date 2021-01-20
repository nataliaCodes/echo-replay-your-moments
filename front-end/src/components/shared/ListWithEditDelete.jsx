import { useState } from 'react';

import useApplicationData from '../../hooks/useApplicationData';
import Button from './Button';
import TogglingEditForm from './TogglingEditForm';

export default function List(props) {

  const { state } = useApplicationData();

  const [ catName, setCatName ] = useState("");
  const [ editMode, setEditMode ] = useState(null);

  const setMode = (i, cat) => {
    setEditMode(i);
    setCatName(cat);
  };

  const categories = state.categories;
  const categoriesList = categories && categories.map((cat, i) => {

    return (
      <div key={i}>
        {editMode !== i && cat}
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
          (<>
            <Button onClick={() => setMode(i, cat)}>Edit</Button>
            <Button onClick={props.onDelete}>Delete</Button>
          </>)
        }
      </div>
    );

  });

  return (
    <div className="List">
      {props.onCateg &&
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