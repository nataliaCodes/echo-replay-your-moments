import { useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Button from './Button';

export default function TogglingEditForm(props) {

  const { interval, setInterval } = props;
  const [ start, setStart ] = useState(props.start);
  const [ end, setEnd ] = useState(props.end);
  const [ timeAlert, setTimeAlert ] = useState(false);
  // console.log('start :', start);
  // console.log('end :', end);

  const handleStartChange = e => {

    setStart(e.target.value);
    const newStart = e.target.value;
    setInterval({...interval, start: newStart});

    if (e.target.value.length < 8 || e.target.value.length > 8) {
      setTimeAlert(true)

    } else if (e.target.value.length === 8) {

      setTimeAlert(false)
    };

  };

  const handleEndChange = e => {

    setEnd(e.target.value);
    const newEnd = e.target.value;
    setInterval({...interval, end: newEnd});

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
          aria-describedby="basic-addon2"
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
        />
        {props.onMoments && (
          <>
            <FormControl
              value={start}
              name="start-time"
              onChange={(e) => handleStartChange(e)}
            />
            <FormControl
              value={end}
              name="end-time"
              onChange={(e) => handleEndChange(e)}
            />
          </>
        )}
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={props.onSave} disabled={timeAlert}>Save</Button>
          <Button variant="outline-secondary" onClick={props.onCancel}>Cancel</Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};