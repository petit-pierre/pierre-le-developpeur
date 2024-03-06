import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userSlice } from "./Slices/userSlice";
import {
  getLikesThunk,
  getProjectsThunk,
  getSkillsThunk,
  getSlidersThunk,
  getToolsThunk,
  getTranslationThunk,
} from "./thunkActionsCreator";

import Home from "./pages/Home";
import SignIn from "./pages/Sign-in";
import User from "./pages/User";
import Error404 from "./pages/404";
import Project from "./pages/Project";
import Delete from "./pages/Delete";
import PostProject from "./pages/PostProject";
import PostSkills from "./pages/PostSkills";
import DeleteSkill from "./pages/DeleteSkill";
import PostTools from "./pages/PostTools";
import DeleteTool from "./pages/DeleteTool";
import Landing from "./pages/Landing";
import UpdateInfo from "./pages/UpdateTranslation";
import PostSliders from "./pages/PostSliders";
import DeleteSlide from "./pages/DeleteSlide";

function App() {
  const dispatch = useDispatch();

  const lookAtLocalStorage = async () => {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState !== null) {
      await dispatch(userSlice.actions.setToken(serialisedState));
    }
  };
  lookAtLocalStorage();

  const getSkills = async () => {
    const getSkillsResult = await dispatch(getSkillsThunk());
  };
  getSkills();

  const getSTools = async () => {
    const getToolsResult = await dispatch(getToolsThunk());
  };
  getSTools();

  const getProjects = async () => {
    const getProjectResult = await dispatch(getProjectsThunk());
  };
  getProjects();

  const getTranslation = async () => {
    const getTranslationsResult = await dispatch(getTranslationThunk());
  };
  getTranslation();

  const getLikes = async () => {
    const getLikesResult = await dispatch(getLikesThunk());
  };
  getLikes();

  const getSlider = async () => {
    const getSliderResult = await dispatch(getSlidersThunk());
  };
  getSlider();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/UpdateInfo" element={<UpdateInfo />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/PostProject" element={<PostProject />} />
        <Route path="/PostSkills" element={<PostSkills />} />
        <Route path="/PostSliders" element={<PostSliders />} />
        <Route path="/PostTools" element={<PostTools />} />
        <Route path="/User" element={<User />} />
        <Route path="/User/Project/:id" element={<Delete />} />
        <Route path="/User/Skills/:skillId" element={<DeleteSkill />} />
        <Route path="/User/Tools/:toolId" element={<DeleteTool />} />
        <Route path="/User/Slide/:slideId" element={<DeleteSlide />} />
        <Route path="/Sign-in" element={<SignIn />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
