import { NavLink } from "react-router-dom";
import "./header.css";

function LoadingHeader() {
  return (
    <nav className="header2">
      <NavLink to="/" className="link">
        <h1>Pierre le developpeur</h1>
      </NavLink>
    </nav>
  );
}

export default LoadingHeader;
