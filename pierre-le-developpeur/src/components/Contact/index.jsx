import { useSelector } from "react-redux";
import "./contact.css";
import { useEffect, useRef, useState } from "react";
import TextArea from "../TextArea";
import Typewrite from "../Typewrite";
import Button from "../Button";
import { Typewriter, useTypewriter } from "react-simple-typewriter";
let mailToken = require(`../../code.json`);

//import "./smtp";

function Contact({ props }) {
  const likes = useSelector((state) => state.data.likes);
  const contact = useSelector((state) => state.data.translations);
  const language = useSelector((state) => state.data.language);
  const translations = useSelector((state) => state.data.translations);

  const [errorMail, setErrorMail] = useState(true);
  const [errorContent, setErrorContent] = useState(true);
  const [discuss, setDiscuss] = useState(false);

  const [error, setError] = useState(false);
  const [sendingError, setSendingError] = useState("");
  const [sending, setSending] = useState(false);

  const [inputMailValue, setInputMailValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");

  const content = useRef();
  const mail = useRef();

  const formMailError = (e) => {
    e.preventDefault();
    setInputMailValue(e.target.value);
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(e.target.value)) {
      setErrorMail(false);
    } else {
      setErrorMail(true);
      //setSendingError(false);
    }
  };
  //let Typewrite = "Bonjour ...";

  /*useEffect(() => {
    console.log("coucou");
  }, [content.current.children[0].children[1][0].value]);*/
  //let text;
  /*useEffect(() => {
    language === "FR" ? (Typewrite = "Bonjour ...") : (Typewrite = "Hello ...");
  }, [language]);*/

  const formContentError = (e) => {
    e.preventDefault();
    setInputContentValue(e.target.value);

    if (
      e.target.value.length > 6 &&
      e.target.value !== translations.english.succes &&
      e.target.value !== translations.french.succes &&
      e.target.value !== translations.english.content &&
      e.target.value !== translations.french.content
    ) {
      setErrorContent(false);
    } else {
      setErrorContent(true);
      //setSendingError(false);
    }
  };
  const sendMail = (content, mail, e) => {
    e.preventDefault();
    const elastic = {
      SecureToken: mailToken.code,
      To: "contact@pierre-le-developpeur.com",
      From: "contact@pierre-le-developpeur.com",
      Subject: "Site pierre le developpeur",
      Body:
        "email : " +
        mail.current.children[0].children[1][0].value +
        " message : " +
        content.current.children[0].children[1][0].value,
    };
    window.Email.send(elastic).then((message) => {
      if (message === "OK") {
        setSending(true);
        setSendingError("");
        setErrorContent(true);
        language === "FR"
          ? (content.current.children[0].children[1][0].value =
              contact.french.succes)
          : (content.current.children[0].children[1][0].value =
              contact.english.succes);
      } else {
        setSending(false);
        setSendingError(message);
        window.open(
          "mailto:contact@pierre-le-developpeur.com?subject=Contact pierre le développeur&body=" +
            content.current.children[0].children[1][0].value
        );
      }
    });
  };

  const dial = (evt) => {
    evt.preventDefault();
    setDiscuss(true);
    document.querySelector(".contact00").focus();
  };
  const closeDial = (evt) => {
    evt.preventDefault();
    setDiscuss(false);
    console.log(discuss);
  };
  /*const hello = document.querySelector(".autoText");
  const autoText = (evt, text) => {
    evt.preventDefault();
    //let text = "Bonjour ...";
    hello.innerHTML = text.slice(0, 3);
  };*/

  return (
    <div className="contactField">
      <div className={discuss === true ? "witheBack" : "noBack"}></div>
      <img src="./assets/bd.png" className="triangle" alt="BD"></img>
      <div className={discuss === true ? "bd discuss" : "bd noDiscuss"}>
        {discuss === true ? (
          <div className="helloContainer">
            {language === "FR" ? (
              <div className="p">
                <Typewrite props={{ text: contact.french.content }}></Typewrite>
              </div>
            ) : (
              <div className="p">
                <Typewriter words={[contact.english.content]}></Typewriter>
              </div>
            )}
            <img
              src="./assets/cross.png"
              className="cross"
              alt="close cross"
              onClick={(evt) => closeDial(evt)}
            ></img>{" "}
          </div>
        ) : (
          <div className="bdContent" onClick={(evt) => dial(evt)}>
            {" "}
            {language === "FR" ? (
              <Typewrite props={{ text: "Bonjour ..." }}></Typewrite>
            ) : (
              <div className="p">
                <Typewriter words={["Hello ..."]}></Typewriter>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={
          discuss === true
            ? "reponse visibleResponse"
            : "reponse hiddenResponse"
        }
      >
        <textarea className="textareaForContact contact00"></textarea>
        <img src="./assets/bd.png" className="triangleResponse" alt="BD"></img>
      </div>
      <div className="cvAndMail">
        <div
          className="inputMail elements mail"
          ref={mail}
          onChange={formMailError}
        >
          <TextArea
            props={{
              french: contact.french.placeholder_mail,
              english: contact.english.placeholder_mail,
              likes: null,
              links: null,
              edit: true,
              style: "windows",
              id: "contact00",
            }}
          ></TextArea>
        </div>
      </div>
      <div className="message">
        <div
          className="elements messagePlace"
          ref={content}
          onChange={formContentError}
        >
          <TextArea
            props={{
              french: contact.french.content,
              english: contact.english.content,
              likes: props.likeId,
              links: null,
              edit: true,
              style: "windows",
              cofee: true,
              id: "contact01",
            }}
          ></TextArea>
        </div>
      </div>
      <div className="divForButton">
        {errorContent === false && errorMail === false ? (
          language === "FR" ? (
            <button
              className="elements buttonSend"
              onClick={(e) => sendMail(content, mail, e)}
            >
              <Button
                props={{
                  style: "windows",
                  send: true,
                  title: contact.french.button,
                }}
              ></Button>
            </button>
          ) : (
            <button
              className="elements buttonSend"
              onClick={(e) => sendMail(content, mail, e)}
            >
              <Button
                props={{
                  style: "windows",
                  send: true,
                  title: contact.english.button,
                }}
              ></Button>
            </button>
          )
        ) : errorMail === true ? (
          language === "FR" ? (
            <div className="elements">
              <Button
                props={{
                  style: "windows",
                  send: false,
                  title: contact.french.error_mail,
                }}
              ></Button>
            </div>
          ) : (
            <div className="elements">
              <Button
                props={{
                  style: "windows",
                  send: false,
                  title: contact.english.error_mail,
                }}
              ></Button>
            </div>
          )
        ) : language === "FR" ? (
          <div className="elements">
            <Button
              props={{
                style: "windows",
                send: false,
                title: contact.french.error_content,
              }}
            ></Button>
          </div>
        ) : (
          <div className="elements">
            <Button
              props={{
                style: "windows",
                send: false,
                title: contact.english.error_content,
              }}
            ></Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Contact;
