import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../svg/logowhite2.png";

const NavBar = () => {
  let location = useLocation();
  console.log(location.pathname);

  return (
    <nav className="App-header">
      <div className="app-logo-container">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="nav-menu">
        <NavLink
          exact={true}
          activeClassName="is-active"
          className="nav-menu-item"
          to="/"
        >
          GAME
        </NavLink>
        <NavLink
          activeClassName="is-active"
          className="nav-menu-item"
          to="/about"
        >
          ABOUT
        </NavLink>
        <NavLink
          activeClassName="is-active"
          className="nav-menu-item"
          to="/resources"
        >
          RESOURCES
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
