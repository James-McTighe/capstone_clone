import { NavLink } from "react-router-dom";
import "./NavbarElements.css";

function Navbar() {
  return (
    <>
      <h1>Reaction Kinetics Application</h1>
      <nav className="navbar">
        <div className="navbar__menu">
          <NavLink className="navbar__link" to="/">
            Home
          </NavLink>
          <NavLink className="navbar__link" to="/input">
            Input
          </NavLink>
          <NavLink className="navbar__link" to="/analysis">
            Rate Calculation
          </NavLink>
          <NavLink className="navbar__link" to="/utilities">
            Utilities
          </NavLink>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
