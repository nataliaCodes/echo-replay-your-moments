import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import Button from '../shared/Button';
import TogglingEditForm from '../shared/TogglingEditForm';

export default function List(props) {


  const { moments, state } = props;
  console.log('moments :', moments);

  //state for the toggling form
  const [ momName, setMomName ] = useState("");
  const [ editMode, setEditMode ] = useState(null);

  //sets edit mode to current form and value to name extracted from state
  const setMode = (key, mom) => {
    setEditMode(key);
    setMomName(mom);
  };

  //state of delete alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertIndex, setAlertIndex] = useState(null);

  const handleSave = (newValue, oldValue) => {
    
    //find moment that is being changed

    //extract its id

    //put new value in

    //send to backend update request
      //set state to new moments


  };

  //render list of moments dynamically
  const momentsList = moments.map(moment => {

    const key = moment.moment_id;
    const name = moment.label;

    return (

      <div key={key}>
        {/* show moment name when edit mode is not active for current element */}
        {editMode !== key && name}
        {/* on edit mode active for current element show edit form */}
        {editMode === key ? (
          <TogglingEditForm
            value={momName}
            name="moment-name"
            placeholder="Moment name"
            onCancel={() => setEditMode(null)}
            onChange={(e) => setMomName(e.target.value)}
            onSave={(e) => handleSave(momName, name)}
          />
        ) :
          // else show the buttons
          (<>
            <Button onClick={() => setMode(key, name)} children={'Edit'} />
            {/* {!showAlert && <Button onClick={() => handleAlert(name)}>Delete</Button>} */}
          </>)
        }
      </div>
    );

  });

  return (
    <>
      <br /><br />
      <>
        <Alert show={showAlert} variant="danger" style={{width: "20em"}}>
          <Alert.Heading>Delete moment</Alert.Heading>
          <p>
            Deleting moment cannot be undone. Proceed?
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShowAlert(false)}>Cancel</Button>
            <Button onClick={() => console.log('delete clicked')} variant="outline-danger">
              Proceed
          </Button>
          </div>
        </Alert>
      </>
      <div className="List">
        {momentsList}
      </div>
      <br /><br />
    </>
  );
}