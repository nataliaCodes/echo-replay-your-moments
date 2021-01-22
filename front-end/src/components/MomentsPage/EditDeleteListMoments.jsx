import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

import useApplicationData from '../../hooks/useApplicationData';

import Button from '../shared/Button';
import TogglingEditForm from '../shared/TogglingEditForm';

export default function List(props) {

  const moments = props.moments;
  console.log('moments :', moments);

  //state of delete alert
  const [showAlert, setShowAlert] = useState(false);

  //render list of moments dynamically

  return (
    <>
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
        <li>Moment 1 <Button>Edit</Button><Button>Delete</Button></li>
        <li>Moment 2 <Button>Edit</Button><Button>Delete</Button></li>
        <li>Moment 3 <Button>Edit</Button><Button>Delete</Button></li>
      </div>
    </>
  );
}