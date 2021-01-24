import { useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Button from '../shared/Button';

export default function TogglingEditForm(props) {

  // const { interval, setInterval } = props;

  //form state
  const [ newMoment, setNewMoment ] = useState("");
  const [ start, setStart ] = useState(0);
  const [ end, setEnd ] = useState(props.end);

  //convert seconds to human readable times
  const hrTime = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  const handleStartChange = e => {

    setStart(e.target.value);
    const newStart = e.target.value;
    if (!props.onMoments) {setInterval({...interval, start: newStart})};

    if (e.target.value.length < 8 || e.target.value.length > 8) {
      setTimeAlert(true)

    } else if (e.target.value.length === 8) {

      setTimeAlert(false)
    };

  };

  const handleEndChange = e => {

    setEnd(e.target.value);
    const newEnd = e.target.value;
    if (!props.onMoments) {setInterval({...interval, end: newEnd})};

    if (e.target.value.length < 8 || e.target.value.length > 8) {
      setTimeAlert(true)

    } else if (e.target.value.length === 8) {

      setTimeAlert(false)
    };

  };

  return (
<>
        {timeAlert && <small>Time needs to be in hh:mm:ss format!</small>}
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Insert moment name"
              name="new-moment"
              value={newMoment}
              onChange={e => setNewMoment(e.target.value)}
            />
            <FormControl
              placeholder="HH:MM:SS"
              name="start-time"
              // value={props.defaultStart}
              // onChange={(e) => handleStartChange(e)}
            />
            <FormControl
              placeholder="HH:MM:SS"
              name="end-time"
              // value={props.defaultEnd}
              // onChange={(e) => handleEndChange(e)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={props.onSave} disabled={timeAlert}>Save</Button>
              <Button variant="outline-secondary" onClick={props.onCancel}>Cancel</Button>
            </InputGroup.Append>
          </InputGroup>
        </>
  );
};