import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userAdress = "User/";

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
