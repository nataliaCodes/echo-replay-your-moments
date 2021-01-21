import { useState, useEffect } from 'react';
import axios from 'axios';

import useApplicationData from '../../hooks/useApplicationData';

import Button from './Button';
import TogglingEditForm from './TogglingEditForm';

export default function List(props) {

  //using app data state to get categories
  const { state, setState } = useApplicationData();

  //keeping edit form state local to avoid too much rendering
  const [ catName, setCatName ] = useState("");
  const [ editMode, setEditMode ] = useState(null);

  //sets edit mode to current form and value to name extracted from state
  const setMode = (i, cat) => {
    setEditMode(i);
    setCatName(cat);
  };

  const handleSave = (newValue, oldValue) => {

    //shallow copy of state categories
    const categ = [...state.categories];
    const categWithIds = [...state.categWitIds];

    //extract id of current category to pass to back-end
    const categId = categWithIds.filter(item => item.substr(0, item.length - 1) === oldValue);
    console.log('categId :', categId);
    const id = categId[0].substr(categId[0].length - 1, categId[0].length);
    console.log('id :', id);

    //get index of value being changed
    let oldIndex = categ.indexOf(oldValue);
    
    //change old value at index with new value
    categ[oldIndex] = newValue;
    
    //set state to new list of categories
    setState({...state, categories: categ});
    
    //send new name and index to back-end
    return axios.post('http://localhost:3001/api/categories', { newValue, id })
      .then(response => {
          setEditMode(null);
          
          console.log('client says: updated cat name sent');
          console.log(response.data);
      })
      .catch(err => { console.log('error:', err) })

  };

  const categoriesList = state.categories && state.categories.map((name, i) => {

    return (
      <div key={i}>
        {/* show category name when edit mode is not active for current element */}
        {editMode !== i && name}
        {/* on edit mode active for current element show edit form */}
        {editMode === i ? (
          <TogglingEditForm 
            value={catName}
            name="cat-name"
            placeholder="Category name"
            onCancel={() => setEditMode(null)} 
            onChange={(e) => setCatName(e.target.value)}
            onSave={(e) => handleSave(catName, name)}
            onDelete={props.onDelete}
          />
        ) :
          // else show the buttons
          (<>
            <Button onClick={() => setMode(i, name)} children={'Edit'} />
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



let stuff = [1, 2, 3, 4, 5];

const grandpa = (stuff) => {
  <Parent stuff={stuff} />
}

const Child = (props) => {
  return (
    <p>{props.num}</p>
  )
}

const parent = (stuff) => {
  const x = stuff.map((item, i) => {
    <Child num={item} />
  })

  return ({x})
}


