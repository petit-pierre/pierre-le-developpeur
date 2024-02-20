import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./user.css";
import { userSlice } from "../../Slices/userSlice";
import Header from "../../components/Header";
import PostProject from "../../components/PostProject";
import DeleteProject from "../../components/DeleteProject";
import { getProjectsThunk } from "../../thunkActionsCreator";

function User() {
  const token = useSelector((state) => state.user.token);
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

  /*const getProjects = async () => {
    const getProjectResult = await dispatch(getProjectsThunk());
    //dispatch(userSlice.actions.setProjects(await getProjectResult));
    return await getProjectResult;
  };

  getProjects();*/

  return (
    <main>
      <Header />
      <h1>Dashboard</h1>
      <div>
        <button onClick={signOut}>sign out</button>
        <p></p>
      </div>
      <PostProject token={token} />
      <DeleteProject token={token} />
    </main>
  );
}

export default User;
