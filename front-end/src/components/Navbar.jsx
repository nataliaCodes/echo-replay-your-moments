import { Link } from "react-router-dom";
import Menu from 'react-bootstrap/Navbar'

import useApplicationData from '../hooks/useApplicationData';

import NavbarItem from './NavbarItem';
import Logout from './Login/Logout';

import '../stylesheets/Navbar.scss';

export default function Navbar(props) {
  
  const { handleLogout, state } = useApplicationData();
  console.log('state :', state);


  return (

    <div className="Navbar">
      <Menu expand="lg">
        <Menu.Toggle aria-controls="basic-Menu-nav" />
        <Menu.Collapse id="basic-Menu-nav">
          <Link to="/">
            <NavbarItem>Home</NavbarItem>
          </Link>
          {props.cookies.user ?
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

          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
        </Menu.Collapse>
      </Menu>



    </div>

  );
}