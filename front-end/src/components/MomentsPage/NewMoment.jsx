import { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '../shared/Button';
import TogglingEditForm from '../shared/TogglingEditForm';

export default function Moment(props) {

  const { state, videoInfo, setVideoInfo, videoDBid, cookies } = props;

  //state for the form toggled by 'Add moment'
  const [showForm, setShowForm] = useState(false);

  //state for the alert showing user they created the moment
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = (newValue, vidId) => {

    setShowForm(false);
    setShowAlert(true);

    const userId = cookies.user;
    let start = videoInfo.startTime;
    let end = videoInfo.endTime;


    //send data to back-end
    return axios.post('http://localhost:3001/api/moments', { userId, vidId, newValue, start, end})
      .then(response => {
        
        console.log('response from addMoment :', response.data);
        videoInfo.moments.push(response.data)
        
        setVideoInfo({...videoInfo, moments: videoInfo.moments});
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
      {!showForm && <Button onClick={() => setShowForm(true)}>Add moment</Button>}
      <br /><br />
      {showForm && (
        <TogglingEditForm
          placeholder="Insert moment name"
          name="new-moment"
          value={videoInfo.newMoment}
          onMoments={true}
          defaultStart={hrTime(videoInfo.startTime)}
          // defaultEnd={hrTime(props.state.duration)}
          defaultEnd={videoInfo.endTime ? hrTime(videoInfo.endTime) : ""}
          // interval={interval}
          // setInterval={setInterval}
          onChange={(e) => setVideoInfo({...videoInfo, newMoment: e.target.value})}
          onSave={() => handleSave(videoInfo.newMoment, videoDBid)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}