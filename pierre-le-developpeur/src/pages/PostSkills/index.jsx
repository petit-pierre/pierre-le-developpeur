import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  putTranslationThunk,
  setProjectPictureThunk,
  setSkillThunk,
} from "../../thunkActionsCreator";

function PostSkills() {
  const frenchTitle = useRef();
  const englishTitle = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const token = useSelector((state) => state.data.token);
  let translations = useSelector((state) => state.data.translations);
  let translation = structuredClone(translations);

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function saveSkill(evt) {
    evt.preventDefault();
    let photo = document.querySelector(".Picture");
    if (
      frenchTitle.current.value &&
      englishTitle.current.value &&
      photo.files[0] !== ""
    ) {
      const frenchTranslation = {
        id: frenchTitle.current.value,
        title: frenchTitle.current.value,
      };
      const englishTranslation = {
        id: frenchTitle.current.value,
        title: englishTitle.current.value,
      };

      translation.english.skills.push(englishTranslation);
      translation.french.skills.push(frenchTranslation);

      const translationSubmit = async () => {
        const putTranslationResult = dispatch(
          putTranslationThunk(translation, token)
        );
      };

      translationSubmit();

      const skill = {
        id: frenchTitle.current.value,
      };

      const formData = new FormData();
      formData.append("imageUrl", "");
      formData.append("image", photo.files[0]);

      const pictureSubmit = async () => {
        const setPictureResult = await dispatch(
          setProjectPictureThunk(formData, token)
        );
        skill.picture_url = setPictureResult.imageUrl;
        skill.picture_id = setPictureResult._id;
        console.log(skill);

        const finalSubmit = async () => {
          await setTimeout(() => {
            const setSkillResult = dispatch(setSkillThunk(skill, token));
          }, 500);
        };

        await finalSubmit();
      };

      pictureSubmit();
      navigate("/User");
    } else {
      alert("champs incomplets");
    }
  }

  function cancelSkill() {
    navigate("/User");
  }
  return (
    <div>
      <Header />
      <p>title in french :</p>
      <input type="text" ref={frenchTitle}></input>
      <p>title in english :</p>
      <input type="text" ref={englishTitle}></input>
      <p>picture :</p>
      <input
        type="file"
        className="Picture"
        name="Picture"
        accept="image/png"
      ></input>
      <p></p>
      <div>
        <button onClick={(evt) => saveSkill(evt)}>Save</button>
        <button onClick={(evt) => cancelSkill(evt)}>Cancel</button>
      </div>
    </div>
  );
}
export default PostSkills;
