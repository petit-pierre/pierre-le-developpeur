import { useSelector } from "react-redux";
import "./textArea.css";
import { useEffect, useRef } from "react";
import LikeButton from "../LikeButton";

function TextArea({ props }) {
  const language = useSelector((state) => state.data.language);
  let textPlace = useRef();

  //window.addEventListener("resize", console.log("coucou"));

  function setTailleHeight(oEvent) {
    var iHeight = "auto";
    this.style.height = iHeight;
    //console.log(this);
    if (this.scrollHeight > 0) {
      iHeight = this.scrollHeight + "px";
      this.style.height = iHeight;
    }
    if (this.value === "") {
      this.style.removeProperty("height");
    }
  }

  function handleResize() {
    var oForm = document.forms[props.french + "myForm"],
      aoTextArea = oForm.getElementsByClassName(props.french);
    //console.log(oForm);
    for (let oTextArea of aoTextArea) {
      /* vous pouver aussi utiliser l'event keyup */
      oTextArea.addEventListener("input", setTailleHeight);
      //si le textarea n'est pas vide au chargement de la page
      setTailleHeight.call(oTextArea, true);
    }
  }

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    // Attach the event listener to the window object
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (language === "FR" && textPlace.current.value === props.english) {
      textPlace.current.value = props.french;
    }
    if (language === "ENG" && textPlace.current.value === props.french) {
      textPlace.current.value = props.english;
    }

    //handleResize();
  }, [language]);

  function clearText(evt) {
    if (props.edit === true) {
      if (
        evt.target.value === props.french ||
        evt.target.value === props.english
      ) {
        evt.target.value = "";
        handleResize();
      }
    }

    /*evt.target.onSelect === true
      ? console.log(evt.target)
      : (evt.target.value = props.french);*/
  }
  function textBack(evt) {
    if (
      evt.target.value != "" &&
      evt.target.value != " " &&
      evt.target.value != "   " &&
      evt.target.value != "    " &&
      evt.target.value != "     " &&
      evt.target.value != "      "
    ) {
    } else {
      //evt.target.value = {language === "FR" ? props.french : props.english};
      language === "FR"
        ? (evt.target.value = props.french)
        : (evt.target.value = props.english);
      handleResize();
    }
  }
  //console.log(props.edit);
  let classi = props.french + " wdgAutoSize edit";
  let classedit = props.french + " wdgAutoSize";
  console.log(props.style);
  return (
    <form
      id={props.french + "myForm"}
      className={
        props.style === "windows"
          ? "mise-en-page textArea windows"
          : "mise-en-page textArea empty"
      }
    >
      <textarea
        id="champText"
        className={props.edit === true ? classi : classedit}
        spellCheck={false}
        readOnly={!props.edit}
        ref={textPlace}
        defaultValue={language === "FR" ? props.french : props.english}
        onSelect={(evt) => clearText(evt)}
        onBlur={(evt) => textBack(evt)}
      ></textarea>
      {props.links != null ? (
        <div className="textareaLinks">
          {" "}
          <h1> {language === "FR" ? "Liens :" : "Links :"} </h1>
          {props.links.map((link) => (
            <div key={link._id}>
              <a href={link.url} target="_blank" className="projectLink">
                {link.url}
              </a>
              <br />
              <br />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {props.likes != null ? (
        <div className="like">
          <LikeButton id={props.likes} className="like"></LikeButton>
        </div>
      ) : (
        ""
      )}
    </form>
  );
}

export default TextArea;
