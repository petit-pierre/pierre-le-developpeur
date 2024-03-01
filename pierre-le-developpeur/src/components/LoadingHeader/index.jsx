import { NavLink } from "react-router-dom";
import "./header.css";
import burgerIcon from "../../assets/burger.svg";

function LoadingHeader() {
  return (
    <div className="loadingHeaderTitle ">
      <div className="topHeader">
        <NavLink to="/Home" className="title">
          <h1 className="purpleTitle">Pierre le developpeur</h1>
        </NavLink>
        <div id="icons">
          <img src={burgerIcon} alt="burger menu"></img>
        </div>
      </div>
    </div>
  );
}

export default LoadingHeader;
