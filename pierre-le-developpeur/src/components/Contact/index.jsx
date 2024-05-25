import { useDispatch, useSelector } from "react-redux";
import "./contact.css";
import { useEffect, useRef, useState } from "react";
import TextArea from "../TextArea";
import Typewrite from "../Typewrite";
import Button from "../Button";
import { Typewriter, useTypewriter } from "react-simple-typewriter";
import { userSlice } from "../../Slices/userSlice";
import LikeButton from "../LikeButton";
let mailToken = require(`../../code.json`);

function Contact({ props }) {
  const dispatch = useDispatch();

  const likes = useSelector((state) => state.data.likes);
  const contact = useSelector((state) => state.data.translations);
  const language = useSelector((state) => state.data.language);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);

  const [errorMail, setErrorMail] = useState(true);
  const [errorContent, setErrorContent] = useState(true);
  //const [discuss, setDiscuss] = useState(false);

  const [error, setError] = useState(false);
  const [wichError, setWichError] = useState("nothing");
  const [sendingError, setSendingError] = useState("");
  const [sending, setSending] = useState(false);
  const [sended, setSended] = useState(false);

  const [inputMailValue, setInputMailValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");

  const content = useRef();
  const mail = useRef();

  const formMailError = (e) => {
    e.preventDefault();
    setSended(false);
    setInputMailValue(e.target.value);
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(e.target.value)) {
      setErrorMail(false);
      if (errorContent === false) {
        setWichError("nothing");
      } else {
        setWichError("content");
      }
    } else {
      setErrorMail(true);
      setWichError("mail");
    }
  };

  const formContentError = (e) => {
    e.preventDefault();
    setInputContentValue(e.target.value);
    setSended(false);

    if (
      e.target.value.length > 6 &&
      e.target.value !== translations.english.succes &&
      e.target.value !== translations.french.succes &&
      e.target.value !== translations.english.content &&
      e.target.value !== translations.french.content
    ) {
      setErrorContent(false);
      if (errorMail === false) {
        setWichError("nothing");
      } else {
        setWichError("mail");
      }
    } else {
      setErrorContent(true);
      setWichError("content");
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
        mail.current.value +
        //mail.current.children[0].children[1][0].value +
        " message : " +
        content.current.value,
      //content.current.children[0].children[1][0].value,
    };
    window.Email.send(elastic).then((message) => {
      if (message === "OK") {
        setSending(true);
        setSendingError("");
        setErrorContent(true);

        content.current.value = "";
        setSended(true);
      } else {
        setSending(false);
        setSendingError(message);
        window.open(
          "mailto:contact@pierre-le-developpeur.com?subject=Contact pierre le développeur&body=" +
            content.current.value
        );
      }
    });
  };

  const dial = (evt) => {
    evt.preventDefault();
    //setDiscuss(true);
    document.querySelector(".contact00").focus();
    dispatch(userSlice.actions.setContactMenu(true));
  };
  const closeDial = (evt) => {
    evt.preventDefault();
    //setDiscuss(false);
    //console.log(discuss);
    setSended(false);
    dispatch(userSlice.actions.setContactMenu(false));
  };
  const closeDialByKey = (evt) => {
    if (evt.code === "Enter") {
      closeDial(evt);
    }
  };

  return (
    <div className="contactField">
      <div className={discuss === true ? "witheBack" : "noBack"}></div>
      <img
        src="https://pierre-le-developpeur.com/assets/bd.png"
        className="triangle"
        alt="BD"
      ></img>
      <img
        src="https://pierre-le-developpeur.com/assets/bd.png"
        className="triangleMini"
        alt="BD"
      ></img>
      <div className={discuss === true ? "bd discuss" : "bd noDiscuss"}>
        {discuss === true ? (
          <div className="helloContainer">
            {sended === true ? (
              language === "FR" ? (
                <div className="p">
                  {" "}
                  <div className="p">
                    <Typewrite
                      props={{ text: contact.french.succes }}
                    ></Typewrite>
                  </div>
                </div>
              ) : (
                <div className="p">
                  <div className="p">
                    <Typewriter words={[contact.english.succes]}></Typewriter>
                  </div>
                </div>
              )
            ) : wichError === "nothing" ? (
              language === "FR" ? (
                <div className="p">
                  <Typewrite
                    props={{ text: contact.french.content }}
                  ></Typewrite>
                </div>
              ) : (
                <div className="p">
                  <Typewriter words={[contact.english.content]}></Typewriter>
                </div>
              )
            ) : wichError === "mail" ? (
              language === "FR" ? (
                <div className="p">
                  <div>
                    <div>
                      <Typewrite
                        props={{ text: contact.french.error_mail }}
                      ></Typewrite>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p">
                  <div>
                    <div>
                      <Typewriter
                        words={[contact.english.error_mail]}
                      ></Typewriter>
                    </div>
                  </div>
                </div>
              )
            ) : language === "FR" ? (
              <div className="p">
                <div>
                  <Typewrite
                    props={{ text: contact.french.error_content }}
                  ></Typewrite>
                </div>
              </div>
            ) : (
              <div className="p">
                <div>
                  <Typewriter
                    words={[contact.english.error_content]}
                  ></Typewriter>
                </div>
              </div>
            )}

            <img
              src="https://pierre-le-developpeur.com/assets/cross.png"
              className="cross"
              alt="close cross"
              onClick={(evt) => closeDial(evt)}
              onKeyDown={(evt) => closeDialByKey(evt)}
              tabIndex={discuss === true ? 10 : -1}
            ></img>
          </div>
        ) : (
          <div className="bdContent" onClick={(evt) => dial(evt)}>
            {" "}
            {language === "FR" ? (
              <div className="bonjour one">
                <Typewrite props={{ text: "Bonjour " }}></Typewrite>
                <div className="dots">
                  <Typewriter
                    words={["..."]}
                    loop={0}
                    deleteSpeed={1}
                    typeSpeed={200}
                  ></Typewriter>
                </div>
              </div>
            ) : (
              <div className="p bonjour">
                <Typewriter words={["Hello "]}></Typewriter>
                <Typewriter
                  words={["..."]}
                  loop={0}
                  deleteSpeed={1}
                  typeSpeed={280}
                ></Typewriter>
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
        <div className="messageAndButton">
          <input
            type="mail"
            className="textareaForMail contact00"
            ref={mail}
            onChange={formMailError}
            placeholder={contact.french.placeholder_mail}
            tabIndex={discuss === true ? 11 : -1}
          ></input>
          <textarea
            className="textareaForContact contact01"
            ref={content}
            onChange={formContentError}
            tabIndex={discuss === true ? 11 : -1}
          ></textarea>
          <div className="like">
            <LikeButton
              propsLike={{ id: "65dc9d6a700bae9e300a79aa", color: "black" }}
              className="like"
            ></LikeButton>
          </div>

          <div className="divForButton">
            {errorContent === false && errorMail === false ? (
              <button
                className="elements buttonSend"
                onClick={(e) => sendMail(content, mail, e)}
                tabIndex={discuss === true ? 11 : -1}
              >
                <span>{language === "FR" ? "Envoyer :" : "Send :"} </span>
                <Button
                  props={{
                    style: "purpleAndWitheTextarea",
                    send: true,
                    title: "./assets/send_mail.png",
                    picture: true,
                  }}
                ></Button>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <img
          src="https://pierre-le-developpeur.com/assets/bd.png"
          className="triangleResponse"
          alt="BD"
        ></img>
      </div>
    </div>
  );
}
export default Contact;
