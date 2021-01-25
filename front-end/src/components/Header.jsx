import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';

export default function Header(props) {
  
  const users = props.state.users;
  const cookie = props.cookies.user

  const currentUser = users && users.filter(user => user.id == props.cookies.user)[0];

  return (

    <div className="Header">
      <h1>Ech<FontAwesomeIcon id="play-icon" icon={faPlayCircle} /></h1>
      <h6>Replay your moments</h6>
      {props.cookies.user ? <h6>Welcome, {currentUser && currentUser.first_name}!</h6> : ""}
      {props.cookies.user && currentUser && <img src={`https://ui-avatars.com/api/?name=${currentUser.first_name}+${currentUser.last_name}&background=random&rounded=true`} alt="avatar" />}
    </div>

  );
}