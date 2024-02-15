import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./user.css";
import { setProfilThunk, setUsernameThunk } from "../../thunkActionsCreator";
import { userSlice } from "../../Slices/userSlice";

function User() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const [edit, setEdit] = useState(false);
  const userName = useRef();
  const signOut = () => {
    localStorage.clear();
    dispatch(userSlice.actions.setToken(null));
    dispatch(userSlice.actions.setUser(null));
    dispatch(userSlice.actions.setId(null));
    dispatch(userSlice.actions.setEmail(null));
    dispatch(userSlice.actions.setFirstName(null));
    dispatch(userSlice.actions.setLastName(null));
  };

  const setProfilResult = dispatch(setProfilThunk(token));

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function userChange() {
    setEdit(!edit);
  }

  function saveName(evt) {
    evt.preventDefault();
    const finalUserName = userName.current.value;
    if (userName.current.value !== "") {
      const setUsernameResult = dispatch(
        setUsernameThunk(finalUserName, token)
      );
      userChange();
    }
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        {edit === true ? (
          <p></p>
        ) : (
          <div>
            <h1>
              Welcome back
              <br />
              {user} !
            </h1>
            <button className="edit-button" onClick={userChange}>
              Edit Name
            </button>
            <br></br>
            <br></br>
          </div>
        )}

        {edit === true ? (
          <div>
            <form>
              <h1>Edit user info</h1>
              <div className="edit">
                <p className="text">User name : </p>
                <input
                  className="inputBox"
                  ref={userName}
                  type="text"
                  id="username"
                />
              </div>
              <br></br>
              <div className="edit">
                <p className="text">First name : </p>
              </div>
              <br></br>
              <div className="edit">
                <p className="text">Last name : </p>
              </div>
              <br></br>
              <button
                className="edit-button nameButton"
                onClick={(evt) => saveName(evt)}
              >
                Save
              </button>
              <button className="edit-button nameButton" onClick={userChange}>
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
    </main>
  );
}

export default User;
