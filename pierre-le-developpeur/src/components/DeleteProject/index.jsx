import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsThunk } from "../../thunkActionsCreator";
import { userSlice } from "../../Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

function DeleteProject({ token }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.data.projects);
  const translations = useSelector((state) => state.data.translations);
  const [edit, setEdit] = useState(false);
  function projectChange() {
    setEdit(!edit);
  }
  /*const [projects, setProjects] = useState("");
  useEffect(() => {
    const getProjects = async () => {
      const getProjectResult = await dispatch(getProjectsThunk());
      dispatch(userSlice.actions.setProjects(await getProjectResult));
      //setProjects(getProjectResult);
    };
    getProjects();
  }, []);*/
  let title = "";

  return (
    <fieldset>
      {edit === true ? (
        <p></p>
      ) : (
        <div>
          <button className="edit-button" onClick={projectChange}>
            Delete project
          </button>
        </div>
      )}

      {edit === true ? (
        <div className="projects">
          {projects.map((project) => (
            <div>
              <Link to={project._id}>
                "Supprimez moi : {project.title}
                {/*translations.map((translation) =>
                  translation._id === project.translation
                    ? (title = translation.french.title)
                    : (title = "titre manquant")
          )*/}
              </Link>
              <p> </p>
            </div>
          ))}
          <button onClick={projectChange}>Cancel</button>
        </div>
      ) : (
        <div></div>
      )}
    </fieldset>
  );
}
export default DeleteProject;
