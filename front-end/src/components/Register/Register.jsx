import Button from '../shared/Button';

import useApplicationData from '../../hooks/useApplicationData';

export default function Register(props) {

  const { state } = useApplicationData();

  return (
    <div className="Register">
      <form>
        <p>First name:</p><input type="text"></input>
        <p>Last name:</p><input type="text"></input>
        <p>Email:</p><input type="text"></input>
        <p>Password:</p><input type="text"></input>
      </form>
      <Button onClick={() => {console.log('clicked')}}>Register</Button>
    </div>
  );
}