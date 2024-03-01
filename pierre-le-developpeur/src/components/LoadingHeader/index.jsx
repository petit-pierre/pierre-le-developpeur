import { NavLink } from "react-router-dom";
import "./header.css";

function LoadingHeader() {
  return (
    <div>
      <div></div>
      <nav className="Loadingheader">
        <NavLink to="/Home" className="link">
          <h1>Pierre le developpeur</h1>
        </NavLink>
      </nav>
    </div>
  );
}

export default LoadingHeader;
