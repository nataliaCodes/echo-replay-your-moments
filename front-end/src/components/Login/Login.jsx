import { Redirect } from "react-router-dom";

import useApplicationData from '../../hooks/useApplicationData';
import Button from '../shared/Button';

export default function Login(props) {

  const { state, handleFormChange, handleLoginSubmit } = useApplicationData();

  if (state.redirect) {
    return <Redirect to={state.redirect} />
  }

  return (
    <div className="Login">
      {state.userId && <div>user: {state.userId}</div>}
      <div>
        {state.error && <small>{state.error}</small>}
      </div><br /> 
      <form onSubmit={event => event.preventDefault()} noValidate>
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
      <Button onClick={handleLoginSubmit}>Log in</Button>
    </div>
  );
}