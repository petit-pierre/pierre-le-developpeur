import { useSelector } from "react-redux";
import "./textArea.css";
import { useEffect, useRef, useState } from "react";
import LikeButton from "../LikeButton";
import Cofee from "../Cofee/coffe";

function AreaForText({ props, content }) {
  const translations = useSelector((state) => state.data.translations);
  const language = useSelector((state) => state.data.language);
  let textPlace = useRef();
  const [cofee, setCofee] = useState(false);
  const french = props.french.split(`\n`);
  const english = props.english.split(`\n`);

  return (
    <div className="textareafield">
      <div className={props.style}>
        <div className="title">
          <span>{props.title}</span>
        </div>
        <form id={props.id + "myForm"} className="mise-en-page textArea">
          <div className="fullResum">
            {language === "FR"
              ? french.map((content) => (
                  <div>
                    <p>{content}</p>
                  </div>
                ))
              : english.map((content) => <p>{content}</p>)}{" "}
          </div>
          <br></br>

          {props.links != null ? (
            <div className="textareaLinks">
              {" "}
              <h1> {language === "FR" ? "Liens :" : "Links :"} </h1>
              {props.links.map((link) => (
                <div key={link._id}>
                  <a
                    href={link.url}
                    target={link.category === "pierre le dev" ? "" : "_blank"}
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

export default AreaForText;
