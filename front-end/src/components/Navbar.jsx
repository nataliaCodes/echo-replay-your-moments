import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import useApplicationData from '../hooks/useApplicationData';

import NavbarItem from './NavbarItem';
import Logout from './Login/Logout';

import './stylesheets/Navbar.css';

export default function Navbar(props) {

  const [cookies, setCookie] = useCookies(["user"]);

  const { handleLogout } = useApplicationData();

  return (

    <div className="Navbar">
      <Link to="/">
        <NavbarItem>Home</NavbarItem>
      </Link>
      <Link to="/videos">
        <NavbarItem>User videos</NavbarItem>
      </Link>
      <Link to="/categories">
        <NavbarItem>User categories</NavbarItem>
      </Link>
      <Link to="/search">
        <NavbarItem>Search results</NavbarItem>
      </Link>
      {/* <Link to="/videos/id">
        <NavbarItem>Show moments</NavbarItem>
      </Link> */}
      { cookies.user ?
        <Link to="/">
          <Logout onClick={handleLogout}>Log out user {cookies.user}</Logout>
        </Link> :
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