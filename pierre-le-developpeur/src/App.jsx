import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import { userSlice } from "./Slices/userSlice";

import Home from "./pages/Home";
import SignIn from "./pages/Sign-in";
import User from "./pages/User";
import Error404 from "./pages/404";
import Footer from "./components/Footer";
import Project from "./pages/Project";
import Delete from "./pages/Delete";
import PostProject from "./pages/PostProject";
import PostSkills from "./pages/PostSkills";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectTranslationsThunk,
  getProjectsThunk,
  getSkillsThunk,
} from "./thunkActionsCreator";
import DeleteSkill from "./pages/DeleteSkill";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.data.token);
  const lookAtLocalStorage = async () => {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState !== null) {
      await dispatch(userSlice.actions.setToken(serialisedState));
      //const setProfilResult = dispatch(setProfilThunk(token));
    }
  };
  lookAtLocalStorage();

  const getSkills = async () => {
    const getSkillsResult = await dispatch(getSkillsThunk());
  };
  getSkills();

  const getProjects = async () => {
    const getProjectResult = await dispatch(getProjectsThunk());
  };
  getProjects();

  const getProjectTranslations = async () => {
    const getProjectTranslationsResult = await dispatch(
      getProjectTranslationsThunk()
    );
  };
  getProjectTranslations();

  return (
    <Router>
      <div className="prout"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PostProject" element={<PostProject />} />
        <Route path="/PostSkills" element={<PostSkills />} />
        <Route path="/User" element={<User />} />
        <Route path="/User/Project/:id" element={<Delete />} />
        <Route path="/User/Skills/:skillId" element={<DeleteSkill />} />
        <Route path="/Sign-in" element={<SignIn />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
