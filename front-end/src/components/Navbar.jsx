import { Link } from "react-router-dom";

import NavbarItem from './NavbarItem';

import './stylesheets/Navbar.css';

export default function Navbar(props) {

  return (

    <div className="Navbar">
      <Link to="/">
        <NavbarItem>Home</NavbarItem>
      </Link>
      <Link to="/user/id/videos">
        <NavbarItem>User videos</NavbarItem>
      </Link>
      <Link to="/user/id/categories">
        <NavbarItem>User categories</NavbarItem>
      </Link>
      <Link to="/user/id/categories/edit">
        <NavbarItem>Edit categories</NavbarItem>
      </Link>
      <Link to="/videos">
        <NavbarItem>Search results</NavbarItem>
      </Link>
      <Link to="/user/id/video/id/moments">
        <NavbarItem>Show moments</NavbarItem>
      </Link>
    </div>

  );
}