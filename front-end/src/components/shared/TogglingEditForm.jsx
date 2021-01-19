import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Button from './Button';

export default function TogglingEditForm(props) {

  return (

    <InputGroup className="mb-3" style={{width: "30em"}}>
      <FormControl
        placeholder="Category name"
        aria-label="Category name"
        aria-describedby="basic-addon2"
        value={props.defaultValue}
        onChange={props.handleChange}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={props.onSave}>Save</Button>
        <Button variant="outline-secondary" onClick={props.onCancel}>Cancel</Button>
      </InputGroup.Append>
    </InputGroup>

  );
};