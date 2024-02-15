import Logo from "../../assets/argentBankLogo.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSlice } from "../../Slices/userSlice";

function Header() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const userAdress = "User/";
  const signOut = () => {
    localStorage.clear();
    dispatch(userSlice.actions.setToken(null));
    dispatch(userSlice.actions.setUser(null));
    dispatch(userSlice.actions.setId(null));
    dispatch(userSlice.actions.setEmail(null));
    dispatch(userSlice.actions.setFirstName(null));
    dispatch(userSlice.actions.setLastName(null));
  };

  return (
    <nav className="main-nav">
      <NavLink to="./" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="navHeader">
        {user != null ? (
          <div>
            <NavLink to={userAdress} className="main-nav-item connected">
              <i className="fa fa-user-circle faHeader"></i>

              {user}
            </NavLink>
            <NavLink
              to="/"
              className="main-nav-item connected"
              onClick={signOut}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </div>
        ) : (
          <NavLink to="/Sign-in" className="main-nav-item">
            <i className="fa fa-user-circle faHeader"></i>
            Sign in
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Header;
