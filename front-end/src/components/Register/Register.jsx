import Button from '../shared/Button';

import useApplicationData from '../../hooks/useApplicationData';

export default function Register(props) {

  const { state, handleFormChange, handleSubmit } = useApplicationData();

  return (
    <div className="Register">
      <form>
        <label>
          First name:&nbsp;&nbsp;
          <input 
            type="text" 
            name="firstName"
            value={state.firstName}
            onChange={handleFormChange}
          ></input>
        </label><br /> 
        <label>
          Last name:&nbsp;&nbsp;
          <input 
            type="text" 
            name="lastName" 
            onChange={handleFormChange}
          ></input>
        </label><br /> 
        <label>
          Email:&nbsp;&nbsp;
          <input 
            type="text" 
            name="email" 
            onChange={handleFormChange}
          ></input>
        </label><br /> 
        <label>
          Password:&nbsp;&nbsp;
          <input 
            type="text" 
            name="password" 
            onChange={handleFormChange}
          ></input>
        </label>
      </form>
      <Button onClick={handleSubmit}>Register</Button>
    </div>
  );
}