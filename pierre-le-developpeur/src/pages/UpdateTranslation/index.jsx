import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { putTranslationThunk } from "../../thunkActionsCreator";
import Header from "../../components/Header";

function UpdateInfo() {
  const french_placeholder_mail = useRef();
  const english_placeholder_mail = useRef();
  const french_placeholder_content = useRef();
  const english_placeholder_content = useRef();
  const french_content = useRef();
  const english_content = useRef();
  const french_button = useRef();
  const english_button = useRef();
  const french_error_mail = useRef();
  const english_error_mail = useRef();
  const french_error_content = useRef();
  const english_error_content = useRef();
  const french_succes = useRef();
  const english_succes = useRef();
  const french_recommendation = useRef();
  const english_recommendation = useRef();

  const token = useSelector((state) => state.data.token);
  const reduxTranslation = useSelector((state) => state.data.translations);

  const translations = Object.assign(reduxTranslation);

  const navigate = useNavigate();

  function projectChange(evt) {
    evt.preventDefault();
    navigate("/User");
  }
  const dispatch = useDispatch();

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function saveInfo(evt) {
    evt.preventDefault();
    const Submit = async () => {
      const putTranslationResult = dispatch(
        putTranslationThunk(translation, token)
      );
    };

    const translation = {
      english: {
        placeholder_mail: english_placeholder_mail.current.value,
        placeholder_content: english_placeholder_content.current.value,
        content: english_content.current.value,
        button: english_button.current.value,
        error_mail: english_error_mail.current.value,
        error_content: english_error_content.current.value,
        succes: english_succes.current.value,
        recommendation: english_recommendation.current.value,
      },
      french: {
        placeholder_mail: french_placeholder_mail.current.value,
        placeholder_content: french_placeholder_content.current.value,
        content: french_content.current.value,
        button: french_button.current.value,
        error_mail: french_error_mail.current.value,
        error_content: french_error_content.current.value,
        succes: french_succes.current.value,
        recommendation: french_recommendation.current.value,
      },
    };

    Submit();
    navigate("/User");
  }

  return (
    <main>
      <Header />
      <div>
        <h1>Info</h1>
        <fieldset>
          <p>Placeholder for mail in french :</p>
          <textarea
            ref={french_placeholder_mail}
            defaultValue={translations.french.placeholder_mail}
          ></textarea>
          <p>Placeholder for mail in english :</p>
          <input
            ref={english_placeholder_mail}
            defaultValue={translations.english.placeholder_mail}
            type="text"
          ></input>
          <p>Placeholder for message in french :</p>
          <input
            type="text"
            defaultValue={translations.french.placeholder_content}
            ref={french_placeholder_content}
          ></input>
          <p>Placeholder for message in english :</p>
          <input
            type="text"
            defaultValue={translations.english.placeholder_content}
            ref={english_placeholder_content}
          ></input>
          <p>Content in french :</p>
          <input
            type="text"
            defaultValue={translations.french.content}
            ref={french_content}
          ></input>
          <p>Content in english :</p>
          <input
            type="text"
            defaultValue={translations.english.content}
            ref={english_content}
          ></input>
          <p>Button in french :</p>
          <input
            type="text"
            defaultValue={translations.french.button}
            ref={french_button}
          ></input>
          <p>Button in english :</p>
          <input
            type="text"
            defaultValue={translations.english.button}
            ref={english_button}
          ></input>
          <p>Mail error in french :</p>
          <input
            type="text"
            defaultValue={translations.french.error_mail}
            ref={french_error_mail}
          ></input>
          <p>Mail error in english :</p>
          <input
            type="text"
            defaultValue={translations.english.error_mail}
            ref={english_error_mail}
          ></input>
          <p>Content error in french :</p>
          <input
            type="text"
            defaultValue={translations.french.error_content}
            ref={french_error_content}
          ></input>
          <p>Content error in english :</p>
          <input
            type="text"
            defaultValue={translations.english.error_content}
            ref={english_error_content}
          ></input>
          <p>Succes in french :</p>
          <input
            type="text"
            defaultValue={translations.french.succes}
            ref={french_succes}
          ></input>
          <p>Succes in english :</p>
          <input
            type="text"
            defaultValue={translations.english.succes}
            ref={english_succes}
          ></input>
        </fieldset>
        <fieldset>
          <p>Recommendation in french :</p>
          <input
            type="text"
            defaultValue={translations.french.recommendation}
            ref={french_recommendation}
          ></input>
          <p>Recommendation in english :</p>
          <input
            type="text"
            defaultValue={translations.english.recommendation}
            ref={english_recommendation}
          ></input>
        </fieldset>
        <p></p>
        <button onClick={(evt) => projectChange(evt)}>Cancel</button>
        <button onClick={(evt) => saveInfo(evt)}>Save</button>
      </div>
    </main>
  );
}

export default UpdateInfo;
