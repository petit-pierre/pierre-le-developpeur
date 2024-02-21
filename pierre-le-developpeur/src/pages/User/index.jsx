import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./user.css";
import { userSlice } from "../../Slices/userSlice";
import Header from "../../components/Header";
import PostProject from "../PostProject";
import DeleteProject from "../../components/DeleteProject";
import { getProjectsThunk } from "../../thunkActionsCreator";

function User() {
  const token = useSelector((state) => state.data.token);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const signOut = () => {
    localStorage.clear();
    dispatch(userSlice.actions.setToken(null));
    navigate("/");
  };

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  return (
    <main>
      <Header />
      <h1>Dashboard</h1>
      <fieldset>
        <button onClick={signOut}>sign out</button>
        <p></p>
      </fieldset>
      <fieldset>
        <Link to="/PostProject">Post new project</Link>
      </fieldset>

      <DeleteProject token={token} />
    </main>
  );
}

export default User;
