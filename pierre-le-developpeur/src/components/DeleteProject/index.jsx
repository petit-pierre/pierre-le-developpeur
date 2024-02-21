import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DeleteProject() {
  const projects = useSelector((state) => state.data.projects);
  const translations = useSelector((state) => state.data.translations);
  const [edit, setEdit] = useState(false);
  function projectChange() {
    setEdit(!edit);
  }

  return (
    <div>
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
              <Link to={"Project/" + project._id} key={`${project.id}`}>
                "Supprimez moi : {project.title}
              </Link>
              <p> </p>
            </div>
          ))}
          <button onClick={projectChange}>Cancel</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default DeleteProject;
