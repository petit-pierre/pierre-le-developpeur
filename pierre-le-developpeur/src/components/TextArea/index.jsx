import { useSelector } from "react-redux";
import "./textArea.css";
import { useEffect, useRef, useState } from "react";
import LikeButton from "../LikeButton";
import Cofee from "../Cofee/coffe";

function TextArea({ props, content }) {
  const language = useSelector((state) => state.data.language);
  let textPlace = useRef();
  const [cofee, setCofee] = useState(false);

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
    var oForm = document.forms[props.id + "myForm"],
      aoTextArea = oForm.getElementsByClassName(props.id);
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
      handleResize();
    }
    if (language === "ENG" && textPlace.current.value === props.french) {
      textPlace.current.value = props.english;
    }

    //handleResize();
  }, [language]);

  function clearText(evt) {
    setCofee(true);
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
    setCofee(false);
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

  let classi = props.id + " wdgAutoSize edit";
  let classedit = props.id + " wdgAutoSize";
  return (
    <div className={props.style}>
      <div className="title">
        <span>{props.title}</span>
      </div>
      <form id={props.id + "myForm"} className="mise-en-page textArea">
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
                <a
                  href={link.url}
                  target="_blank"
                  className="projectLink"
                  rel="noopener noreferrer"
                >
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
        {props.cofee === true ? (
          <div
            className={cofee === true ? "cofeeComponentEdit" : "cofeeComponent"}
          >
            <Cofee></Cofee>
          </div>
        ) : (
          ""
        )}
        <div className="softSkills">{content}</div>
      </form>
    </div>
  );
}

export default TextArea;
