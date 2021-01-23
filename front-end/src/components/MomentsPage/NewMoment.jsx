import { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '../shared/Button';
import TogglingEditForm from '../shared/TogglingEditForm';

export default function Moment(props) {

  const { videoInfo, setVideoInfo, videoDBid, cookies } = props;

  //state for the form toggled by 'Add moment'
  const [showForm, setShowForm] = useState(false);

  //state for the Add moment input
  const [ newMom, setNewMom ] = useState("");
  const [ defaultStart, setDefaultStart ] = useState(videoInfo.startTime);
  const [ defaultEnd, setDefaultEnd ] = useState(videoInfo.endTime);

  //state for the alert showing user they created the moment
  const [showAlert, setShowAlert] = useState(false);

  //state set by the TogglingEditForm
  const [ interval, setInterval ] = useState(null);

  const handleSave = (newValue, vidId) => {

    setShowForm(false);
    setShowAlert(true);

    const userId = cookies.user;

    //I need video id, user id, label, start, end --> from interval

    //send data to back-end
    return axios.post('http://localhost:3001/api/moments', { userId, vidId, newValue, start, end})
      .then(response => {
        
        console.log('response from addMoment :', response.data);

        

      })
      .catch(err => { console.log('error:', err) })
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [showAlert]);

  //convert seconds to human readable times
  const hrTime = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  return (
    <div className="Moment">
      <Button onClick={() => setShowForm(true)}>Add moment</Button>
      <br /><br />
      {showForm && (
        <TogglingEditForm
          placeholder="Insert moment name"
          name="new-moment"
          value={newMom}
          onMoments={true}
          defaultStart={defaultStart}
          defaultEnd={defaultEnd}
          interval={interval}
          setInterval={setInterval}
          onChange={(e) => setNewMom(e.target.value)}
          onSave={() => handleSave(newMom, videoDBid)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}