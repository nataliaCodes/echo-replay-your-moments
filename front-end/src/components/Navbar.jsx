import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import useApplicationData from '../hooks/useApplicationData';

import NavbarItem from './NavbarItem';
import Logout from './Login/Logout';

import '../stylesheets/Navbar.scss';

export default function Navbar(props) {

  // const [cookies, setCookies] = useCookies(["user"]);

  const { handleLogout } = useApplicationData();

  return (

    <div className="Navbar">
      <Link to="/">
        <NavbarItem>Home</NavbarItem>
      </Link>
      { props.cookies.user ?
        <>
          <Link to="/videos">
            <NavbarItem>My videos</NavbarItem>
          </Link>
          <Link to="/categories">
            <NavbarItem>My categories</NavbarItem>
          </Link>
          <Link to="/">
            <Logout onClick={handleLogout}>Log out {props.cookies.user}</Logout>
          </Link> 
        </>
        :
        <>
          <Link to="/register">
            <NavbarItem>Register</NavbarItem>
          </Link>
          <Link to="/login">
            <NavbarItem>Log in</NavbarItem>
          </Link>
        </>
      }
    </div>

  );
}