import Button from 'react-bootstrap/Button';

export default function StyledButton(props) {

  return (

    <Button variant="outline-dark" onClick={props.onClick} disabled={props.disabled}>{props.children}</Button>

  );
}