import { NavLink } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <nav className="header">
      <NavLink to="/" className="link">
        <h1>Pierre le developpeur</h1>
      </NavLink>
    </nav>
  );
}

export default Header;
