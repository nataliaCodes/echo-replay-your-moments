import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';

export default function Header(props) {

  return (

    <>
      <h1>Ech<FontAwesomeIcon icon={faPlayCircle} /></h1>
      <h6>Replay your moments</h6>
      {props.cookies.user ? <h6>Welcome!</h6> : ""}
    </>

  );
}