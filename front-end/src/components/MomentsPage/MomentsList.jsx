import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import Button from '../shared/Button';

export default function List(props) {

  const { videoInfo, setVideoInfo } = props;
  const moments = videoInfo.moments;

  //state for the selected moment
  const [ momName, setMomName ] = useState("");

  //state of delete alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMom, setAlertMom] = useState(null);

  const handleDelete = (momName) => {
    
    setShowAlert(false);

    //find moment that is being changed and extract its id
    const deleted = moments.filter(moment => moment.label === momName)[0];
    const id = deleted.moment_id;

    //create updated array for back-end
    const newMoments = moments.filter(moment => moment.moment_id !== id)

    setVideoInfo({...videoInfo, moments: newMoments})

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
  const momentsList = moments.sort((a, b) => b.moment_id - a.moment_id).map(moment => {

    const key = moment.moment_id;
    const name = moment.label;
    const start = hrTime(moment.start_time);
    const end = hrTime(moment.end_time);

    return (

      <div key={key} style={{border: "1px solid gray", padding: ".5em"}}>
        <h6>{name}:  {start} - {end}</h6>
        <Button onClick={() => handlePlay(moment.start_time, moment.end_time)}>Play</Button>
        <Button onClick={() => handleAlert(name)}>Delete</Button>
      </div>
    );

  });
  

  return (
    <>
      <br /><br />
      <>
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete moment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deleting moment cannot be undone. Proceed?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlert(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDelete(alertMom)}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
        {/* <Alert show={showAlert} variant="danger" style={{width: "20em"}}>
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
        </Alert> */}
      </>
      <div className="List">
        {momentsList}
      </div>
      <br /><br />
    </>
  );
}