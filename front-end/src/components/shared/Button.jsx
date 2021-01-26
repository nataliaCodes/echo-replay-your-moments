import Button from 'react-bootstrap/Button';

export default function StyledButton(props) {

  return (

    <Button variant="outline-dark" type="submit" onClick={props.onClick}>{props.children}</Button>

  );
}