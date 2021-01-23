import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import Button from '../shared/Button';
import TogglingEditForm from '../shared/TogglingEditForm';

export default function List(props) {

  const { videoInfo, setVideoInfo, state, setState } = props;
  const moments = videoInfo.moments;

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
  const [alertMom, setAlertMom] = useState(null);

  const handleSave = (newValue, oldValue) => {
    
    setEditMode(null);
    
    //find moment that is being changed and extract its id
    const updated = moments.filter(moment => moment.label === oldValue)[0];
    const id = updated.moment_id;

    //create updated array for back-end
    const newMoments = moments.map(moment => {
  
        if (moment.moment_id === id) {
          moment.label = newValue;
        }
        return moment;
      });

    //send update request to backend
    return axios.put('http://localhost:3001/api/moments', { updated })
    .then(response => {
      setEditMode(null);
    })
    .catch(err => { console.log('error:', err) })
      
  };

  const handleDelete = (momName) => {
    
    setShowAlert(false);

    //find moment that is being changed and extract its id
    const deleted = moments.filter(moment => moment.label === momName)[0];
    const id = deleted.moment_id;

    //create updated array for back-end
    const newMoments = moments.filter(moment => moment.moment_id !== id)

    setVideoInfo({...videoInfo, moments: moments.filter(moment => moment.moment_id !== id)})

    //send data to back-end
    return axios.delete('http://localhost:3001/api/moments', { data: { id } })
      .then(response => {
        console.log('client says: delete request sent');
        console.log(response.data);

      })
      .catch(err => { console.log('error:', err) })

  };

  const handleAlert = (momName) => {
    setAlertMom(momName);
    setShowAlert(true);
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
            <Button onClick={() => handleAlert(name)}>Delete</Button>
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
            <Button onClick={() => handleDelete(alertMom)} variant="outline-danger">
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