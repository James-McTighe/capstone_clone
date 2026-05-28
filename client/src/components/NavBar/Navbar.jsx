import { NavLink } from "react-router-dom";
import "./NavbarElements.css";

const Navbar = () => {
  return (
    <>
      <h1 className="p-5 pb-0.5 text-2xl text-emerald-500 bg-[#111827]">Reaction Kinetics Application</h1>
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
