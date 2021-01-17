import { Redirect } from "react-router-dom";

import useApplicationData from '../../hooks/useApplicationData';
import Button from '../shared/Button';

export default function Register(props) {

  const { state, handleFormChange, handleRegisterSubmit } = useApplicationData();

  if (state.redirect) {
    return <Redirect to={state.redirect} />
  }

  return (
    <div className="Register">
      <div>
        {state.error && <small>{state.error}</small>}
      </div><br /> 
      <form onSubmit={event => event.preventDefault()} noValidate>
        <label htmlFor="firstName">
          First name:&nbsp;&nbsp;
          <input 
            type="text" 
            name="firstName"
            value={state.firstName}
            onChange={handleFormChange}
            noValidate
          ></input>
        </label><br /> 
        <label htmlFor="lastName">
          Last name:&nbsp;&nbsp;
          <input 
            type="text" 
            name="lastName" 
            onChange={handleFormChange}
            noValidate
          ></input>
        </label><br /> 
        <label htmlFor="email">
          Email:&nbsp;&nbsp;
          <input 
            type="email" 
            name="email" 
            onChange={handleFormChange}
            noValidate
          ></input>
        </label><br /> 
        <label htmlFor="password">
          Password:&nbsp;&nbsp;
          <input 
            type="password" 
            name="password" 
            onChange={handleFormChange}
            noValidate
          ></input>
        </label>
      </form>
      <Button onClick={handleRegisterSubmit}>Register</Button>
    </div>
  );
}