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
  const setMode = (key, mom, start, end) => {
    setEditMode(key);
    setMomName(mom);
    setInterval({start, end});
  };

  //state of delete alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMom, setAlertMom] = useState(null);

  //state set by the TogglingEditForm
  const [ interval, setInterval ] = useState(null);

  const handleSave = (newValue, oldValue, interval) => {
    
    setEditMode(null);
    
    //find moment that is being changed and extract its id
    const updated = moments.filter(moment => moment.label === oldValue)[0];
    const id = updated.moment_id;

    //send update request to backend
    return axios.put('http://localhost:3001/api/moments', { id, newValue, interval })
    .then(response => {
      console.log('response from be :', response.data);
      const { start_time, end_time } = response.data[0];

      const newMoment = { moment_id: id, label: newValue, start_time: start_time, end_time: end_time};

      moments.forEach((mom, i) => {
        if(mom.moment_id === newMoment.moment_id) {
          moments[i] = newMoment;
        };
      });

      setVideoInfo({...videoInfo, moments});

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

  const handleAlert = momName => {
    setAlertMom(momName);
    setShowAlert(true);
  };

  const handlePlay = (start, end) => {
    setVideoInfo({...videoInfo, startTime: start, endTime: end})
  };

  //convert seconds to human readable times
  const hrTime = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };



  //render list of moments dynamically
  const momentsList = moments.map(moment => {

    const key = moment.moment_id;
    const name = moment.label;
    const start = hrTime(moment.start_time);
    const end = hrTime(moment.end_time);

    return (

      <div key={key} style={{border: "1px solid gray", padding: ".5em"}}>
        {/* show moment name when edit mode is not active for current element */}
        {editMode !== key && <h6>{name}:  {start} - {end}</h6>}
        {/* on edit mode active for current element show edit form */}
        {editMode === key ? (
          <TogglingEditForm
            value={momName}
            name="moment-name"
            placeholder="Moment name"
            onMoments={true}
            interval={interval}
            setInterval={setInterval}
            start={moment.start_time}
            end={moment.end_time}
            // start={start}
            // end={end}
            onCancel={() => setEditMode(null)}
            onChange={(e) => setMomName(e.target.value)}
            onSave={(e) => handleSave(momName, name, interval)}
          />
        ) :
          // else show the buttons
          (<>
            <Button onClick={() => handlePlay(moment.start_time, moment.end_time)}>Play</Button>
            <Button onClick={() => setMode(key, name, start, end)}>Edit</Button>
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