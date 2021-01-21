import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import useApplicationData from '../../hooks/useApplicationData';

import Button from './Button';
import TogglingEditForm from './TogglingEditForm';

export default function List(props) {

  //using app data state to get categories
  const { state, setState } = useApplicationData();

  //keeping edit form state local to avoid too much rendering
  const [catName, setCatName] = useState("");
  const [editMode, setEditMode] = useState(null);

  //sets edit mode to current form and value to name extracted from state
  const setMode = (i, cat) => {
    setEditMode(i);
    setCatName(cat);
  };

  //state of delete alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertCateg, setAlertCateg] = useState(null);

  const handleSave = (newValue, oldValue) => {

    //shallow copy of state categories
    const categ = [...state.categories];
    const categWithIds = [...state.categWitIds];

    //extract id of current category to pass to back-end
    const categId = categWithIds.filter(item => item.substr(0, item.length - 1) === oldValue);
    const id = categId[0].substr(categId[0].length - 1, categId[0].length);

    //get index of value being changed
    let oldIndex = categ.indexOf(oldValue);

    //change old value at index with new value
    categ[oldIndex] = newValue;

    //set state to new list of categories
    setState({ ...state, categories: categ });

    //send new name and index to back-end
    return axios.put('http://localhost:3001/api/categories', { newValue, id })
      .then(response => {
        setEditMode(null);

        console.log('client says: updated cat name sent');
        console.log(response.data);
      })
      .catch(err => { console.log('error:', err) })

  };

  const handleDelete = (categName) => {
    setShowAlert(false);

    //shallow copy of categories with ids
    const categWithIds = [...state.categWitIds];

    //extract id of current category to pass to back-end
    const categId = categWithIds.filter(item => item.substr(0, item.length - 1) === categName);
    console.log('categId :', categId);
    const id = categId[0].substr(categId[0].length - 1, categId[0].length);
    console.log('id :', id);


    //send data to back-end
    return axios.delete('http://localhost:3001/api/categories', { data: { id } })
      .then(response => {
        console.log('client says: delete request sent');
        console.log(response.data);
        setState({...state, categories: state.categories.filter(categ => !categ.includes(categName))})
      })
      .catch(err => { console.log('error:', err) })

  };

  const handleAlert = (categName) => {
    setAlertCateg(categName);
    setShowAlert(true);
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
          />
        ) :
          // else show the buttons
          (<>
            <Button onClick={() => setMode(i, name)} children={'Edit'} />
            {!showAlert && <Button onClick={() => handleAlert(name)}>Delete</Button>}
          </>)
        }
      </div>
    );

  });

  return (
    <>
      <>
      <Alert show={showAlert} variant="danger" style={{width: "20em"}}>
        <Alert.Heading>Delete category</Alert.Heading>
        <p>
          Deleting category cannot be undone. Proceed?
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(alertCateg)} variant="outline-danger">
            Proceed
        </Button>
        </div>
      </Alert>
      </>
      {/* list component is being used in two different pages, render accordingly */}
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
    </>
  );
}