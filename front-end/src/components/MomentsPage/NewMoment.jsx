import { useState, useEffect } from 'react';
import axios from 'axios';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Button from '../shared/Button';

export default function Moment(props) {

  const { videoInfo, setVideoInfo, videoDBid, cookies } = props;
  // const { startTime, endTime, newMoment } = videoInfo;
  console.log('videoInfo newmoment :', videoInfo);
  console.log('videoDBid :', videoDBid);

  //convert seconds to human readable times
  const hrTime = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  //convert human readable to seconds
  const convertToSeconds = str => {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
  }
  
  //state for the form toggled by 'Add moment'
  const [showForm, setShowForm] = useState(false);
  const [start, setStart] = useState(hrTime(0));
  const [end, setEnd] = useState(videoInfo.endTime ? hrTime(videoInfo.endTime) : hrTime(240));

  //time alert state
  const [ timeAlert, setTimeAlert ] = useState(false);

  //state for the alert showing user they created the moment
  const [showAlert, setShowAlert] = useState(false);

  const handleStartChange = e => {

    const inSec = convertToSeconds(e.target.value);

    setStart(e.target.value);
    setVideoInfo({...videoInfo, startTime: inSec});

    if (e.target.value.length < 8 || e.target.value.length > 8) {
      setTimeAlert(true)

    } else if (e.target.value.length === 8) {

      setTimeAlert(false)
    };

  };

  const handleEndChange = e => {

    const inSec = convertToSeconds(e.target.value);

    setEnd(e.target.value);
    setVideoInfo({...videoInfo, endTime: inSec});

    if (e.target.value.length < 8 || e.target.value.length > 8) {
      setTimeAlert(true)

    } else if (e.target.value.length === 8) {

      setTimeAlert(false)
    };

  };


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


  return (
    <div className="Moment">
      {!showForm && <Button onClick={() => setShowForm(true)}>Add moment</Button>}
      <br /><br />
      {showForm && <>
        {timeAlert && <small>Time needs to be in hh:mm:ss format!</small>}
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Insert moment name"
              name="new-moment"
              value={videoInfo.newMoment}
              onChange={e => setVideoInfo({...videoInfo, newMoment: e.target.value})}
            />
            <FormControl
              placeholder="HH:MM:SS"
              name="start-time"
              value={start}
              onChange={(e) => handleStartChange(e)}
            />
            <FormControl
              placeholder="HH:MM:SS"
              name="end-time"
              value={end}
              onChange={(e) => handleEndChange(e)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={props.onSave} disabled={timeAlert}>Save</Button>
              <Button variant="outline-secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </InputGroup.Append>
          </InputGroup>
        </>}
    </div>
  );
}