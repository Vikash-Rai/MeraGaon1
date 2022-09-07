import React from "react";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
     
      <div className="container">
        <Link className="btn btn-outline-light" exact to="/">Home</Link>
        <h4>Mera Gaon</h4>
      </div>
      
    </nav>
  );
};

export default Navbar;
