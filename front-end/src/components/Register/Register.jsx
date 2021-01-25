import { Redirect } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';

import useApplicationData from '../../hooks/useApplicationData';

import Form from 'react-bootstrap/Form';
import Button from '../shared/Button';

export default function Register(props) {

  //handling all user state from within useApplicationData
  const { state, handleFormChange, handleRegisterSubmit } = useApplicationData();

  if (state.redirect) {
    return <Redirect to={state.redirect} />;
  }

  return (
    <div className="Register">
      <div>
        {state.error && <Form.Text>{state.error}</Form.Text>}
      </div><br />
      <div div className="form">
        <Form onSubmit={event => event.preventDefault()} noValidate>
          <Form.Group controlId="first_name">
            <Form.Label htmlFor="firstName">
              First name:&nbsp;&nbsp;
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={state.firstName}
              onChange={handleFormChange}
              noValidate
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="last_name">
            <Form.Label htmlFor="lastName">
              Last name:&nbsp;&nbsp;
            <Form.Control
                type="text"
                name="lastName"
                onChange={handleFormChange}
                noValidate
              ></Form.Control>
            </Form.Label>
          </Form.Group>
          <Form.Group controlId="formEmail">
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
          <Form.Group controlId="formPassword">
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
        <Button onClick={handleRegisterSubmit}>Register</Button>
      </div>
    </div>

  );
}