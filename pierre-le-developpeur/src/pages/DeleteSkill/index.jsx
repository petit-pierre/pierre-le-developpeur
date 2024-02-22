import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePictureThunk,
  deleteSkillThunk,
  putTranslationThunk,
} from "../../thunkActionsCreator";

function DeleteSkill() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { skillId } = useParams();
  let translations = useSelector((state) => state.data.translations);
  let translation = structuredClone(translations);

  console.log(skillId);
  const skills = useSelector((state) => state.data.skills);
  const skill = skills.find((skill) => skill._id === skillId);
  const token = useSelector((state) => state.data.token);

  //const translationId = project.translation;

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  let tableTranslationFrench = translation.french.skills;
  let tableTranslationEnglish = translation.english.skills;
  const foundFrench = tableTranslationFrench.find(
    (element) => element.id === skill.id
  );
  const foundEnglish = tableTranslationEnglish.find(
    (element) => element.id === skill.id
  );
  function removeFrenchValue(value, index, arr) {
    if (value === foundFrench) {
      arr.splice(index, 1);
      return true;
    }
    return false;
  }
  tableTranslationFrench.filter(removeFrenchValue);
  function removeEnglishValue(value, index, arr) {
    if (value === foundEnglish) {
      arr.splice(index, 1);
      return true;
    }
    return false;
  }
  tableTranslationFrench.filter(removeEnglishValue);

  translation.french.skills = tableTranslationFrench;
  translation.english.skills = tableTranslationEnglish;

  console.log(translation);

  function goBack() {
    navigate("/User");
  }

  function deleteSkill() {
    const translationSubmit = async () => {
      const putTranslationResult = dispatch(
        putTranslationThunk(translation, token)
      );
    };

    translationSubmit();

    const id = skill.picture_id;
    const deletePicture = async () => {
      const deletePictureResult = await dispatch(deletePictureThunk(id, token));
    };
    deletePicture();

    /*const deleteTranslation = async () => {
      const deleteProjectTranslationResult = await dispatch(
        deleteProjectTranslationThunk(translationId, token)
      );
    };
    deleteTranslation();*/
    const skillId = skill._id;
    const deleteSkill = async () => {
      const deleteSkillResult = await dispatch(
        deleteSkillThunk(skillId, token)
      );
    };
    deleteSkill();

    navigate("/User");
  }
  return (
    <div>
      <Header />
      <h1>Oh non !!!!!!</h1>
      <p>Confirmez vous la suppression de ce skill : {skill.id} ?</p>
      <button onClick={deleteSkill}>OUI</button>
      <button onClick={goBack}>NON</button>
    </div>
  );
}

export default DeleteSkill;
