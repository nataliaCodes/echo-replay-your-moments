import { Redirect } from "react-router-dom";

import useApplicationData from '../../hooks/useApplicationData';

import Form from 'react-bootstrap/Form';
import Button from '../shared/Button';

export default function Login(props) {

  //handling all user state from within useApplicationData
  const { state, handleFormChange, handleLoginSubmit } = useApplicationData();

  if (state.redirect) {
    return <Redirect to={state.redirect} />;
  }

  return (
    <div className="Login">
      <div>
        {state.error && <Form.Text>{state.error}</Form.Text>}
      </div><br />
      <div className="form">
        <Form onSubmit={event => event.preventDefault()} noValidate>
          <Form.Group controlId="first_name">
            <Form.Label htmlFor="email">
              Email:&nbsp;&nbsp;
              <Form.Control
                type="email"
                name="email"
                onChange={handleFormChange}
                noValidate
              ></Form.Control>
            </Form.Label>
          </Form.Group>
          <Form.Group controlId="first_name">
            <Form.Label htmlFor="password">
              Password:&nbsp;&nbsp;
              <Form.Control
                type="password"
                name="password"
                onChange={handleFormChange}
                noValidate
              ></Form.Control>
            </Form.Label>
          </Form.Group>
        </Form>
        <Button onClick={handleLoginSubmit}>Log in</Button>
      </div>
    </div>
  );
}