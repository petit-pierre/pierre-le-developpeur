import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePictureThunk,
  deleteProjectThunk,
} from "../../thunkActionsCreator";

function DeleteProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const projects = useSelector((state) => state.user.projects);
  const project = projects.find((projects) => projects.id === projectId);
  const token = useSelector((state) => state.user.token);
  console.log(projects);

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function goBack() {
    navigate("/User");
  }

  function deleteProject() {
    for (let i = 0; i < project.links.length; i++) {
      const id = project.links[i].picture_id;
      const deletePicture = async () => {
        const deletePictureResult = await dispatch(
          deletePictureThunk(id, token)
        );
      };
      deletePicture();
    }
    for (let i = 0; i < project.sliders.length; i++) {
      const id = project.sliders[i].picture_id;
      const deletePicture = async () => {
        const deletePictureResult = await dispatch(
          deletePictureThunk(id, token)
        );
      };
      deletePicture();
    }
    const projectId = project._id;
    const deleteProject = async () => {
      const deleteProjectResult = await dispatch(
        deleteProjectThunk(projectId, token)
      );
      console.log(projectId);
    };
    deleteProject();

    navigate("/User");
  }
  return (
    <div>
      <Header />
      <h1>Oh non !!!!!!</h1>
      <p>
        Confirmez vous la suppression de ce projet : {project.title.french} ?
      </p>
      <button onClick={deleteProject}>OUI</button>
      <button onClick={goBack}>NON</button>
    </div>
  );
}

export default DeleteProject;
