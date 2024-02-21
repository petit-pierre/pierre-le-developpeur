import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Header() {
  return (
    <nav>
      <NavLink to="./">
        <h1>Pierre le developpeur</h1>
      </NavLink>
      <div></div>
    </nav>
  );
}

export default Header;
