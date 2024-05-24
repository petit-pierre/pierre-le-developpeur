import { useSelector } from "react-redux";
import "./textArea.css";
import { useEffect, useRef, useState } from "react";
import LikeButton from "../LikeButton";
import Cofee from "../Cofee/coffe";

function TextArea({ props, content }) {
  const translations = useSelector((state) => state.data.translations);
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
        evt.target.value === props.english ||
        evt.target.value === translations.english.succes ||
        evt.target.value === translations.french.succes
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

  return (
    <div className="textareafield">
      <div className={props.style}>
        <div className="title">
          <span>{props.title}</span>
        </div>
        <form id={props.id + "myForm"} className="mise-en-page textArea">
          <textarea
            id="champText"
            className={
              props.edit === true
                ? props.cofee === true
                  ? props.id + " wdgAutoSize edit padding"
                  : props.id + " wdgAutoSize edit"
                : props.id + " wdgAutoSize"
            }
            spellCheck={false}
            readOnly={!props.edit}
            ref={textPlace}
            defaultValue={language === "FR" ? props.french : props.english}
            onSelect={(evt) => clearText(evt)}
            onBlur={(evt) => textBack(evt)}
            tabIndex={props.edit === false ? -1 : 0}
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
            <div className="likePlace">
              <LikeButton
                propsLike={
                  props.style === "windows" && props.edit === false
                    ? { id: props.likes, color: "withe" }
                    : { id: props.likes, color: "black" }
                }
              ></LikeButton>
            </div>
          ) : (
            ""
          )}
          {props.cofee === true ? (
            <div
              className={
                cofee === true ? "cofeeComponentEdit" : "cofeeComponent"
              }
            >
              <Cofee></Cofee>
            </div>
          ) : (
            ""
          )}
          <div className="softSkills">{content}</div>
          {props.cofee === true && props.edit === false ? (
            <div className="spacedTextArea"></div>
          ) : (
            ""
          )}
          {props.sign === true ? (
            <a
              href="https://www.linkedin.com/in/stephane-fassetta-748aa8129/"
              target="blank"
            >
              <p className={language === "FR" ? "sign" : "sign"}>
                Fassetta Stéphane.
              </p>
            </a>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
}

export default TextArea;
