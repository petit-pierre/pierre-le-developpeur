import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//import "./user.css";
import { userSlice } from "../../Slices/userSlice";
import Header from "../../components/Header";
import DeleteProject from "../../components/DeleteProject";
import DeleteSkill from "../../components/DeleteSkill";
import DeleteTool from "../../components/DeleteTool";
//import UpdateInfo from "../UpdateTranslation";

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
      </fieldset>
      <fieldset>
        <Link to="/PostProject">Post new project</Link>
      </fieldset>
      <fieldset>
        <DeleteProject />
      </fieldset>
      <fieldset>
        <Link to="/PostSkills">Post new skill</Link>
      </fieldset>
      <fieldset>
        <DeleteSkill />
      </fieldset>
      <fieldset>
        <Link to="/PostTools">Post new tool</Link>
      </fieldset>
      <fieldset>
        <DeleteTool />
      </fieldset>
      <fieldset>
        <Link to="/UpdateInfo">Update info</Link>
      </fieldset>
    </main>
  );
}

export default User;
