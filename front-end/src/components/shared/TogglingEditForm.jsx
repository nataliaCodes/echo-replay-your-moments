//the form that gets toggled with buttons on edit categories page
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Button from './Button';

export default function TogglingEditForm(props) {

  return (

    <InputGroup className="mb-3" style={{width: "30em"}}>
      <FormControl
        aria-describedby="basic-addon2"
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={props.onSave}>Save</Button>
        <Button variant="outline-secondary" onClick={props.onCancel}>Cancel</Button>
      </InputGroup.Append>
    </InputGroup>

  );
};