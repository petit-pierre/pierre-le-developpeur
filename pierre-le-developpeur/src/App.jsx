import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { userSlice } from "./Slices/userSlice";

import Home from "./pages/Home";
import SignIn from "./pages/Sign-in";
import User from "./pages/User";
import Error404 from "./pages/404";
import Footer from "./components/Footer";
import Project from "./pages/Project";
import Delete from "./pages/Delete";
import PostProject from "./pages/PostProject";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectTranslationsThunk,
  getProjectsThunk,
} from "./thunkActionsCreator";

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

  //const [projects, setProjects] = useState("");
  const getProjects = async () => {
    const getProjectResult = await dispatch(getProjectsThunk());
    dispatch(userSlice.actions.setProjects(await getProjectResult));
  };
  getProjects();

  const getProjectTranslations = async () => {
    const getProjectTranslationsResult = await dispatch(
      getProjectTranslationsThunk()
    );
    dispatch(
      userSlice.actions.setTranslations(await getProjectTranslationsResult)
    );
  };
  getProjectTranslations();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Project/:project" element={<Project />} />
        <Route path="/PostProject" element={<PostProject />} />
        <Route path="/User" element={<User />} />
        <Route path="/User/:id" element={<Delete />} />
        <Route path="/Sign-in" element={<SignIn />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
