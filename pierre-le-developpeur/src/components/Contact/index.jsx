import { useSelector } from "react-redux";
import "./contact.css";
import { useEffect, useRef, useState } from "react";
import TextArea from "../TextArea";

//import "./smtp";

function Contact({ props }) {
  const likes = useSelector((state) => state.data.likes);
  const contact = useSelector((state) => state.data.translations);
  const language = useSelector((state) => state.data.language);
  const translations = useSelector((state) => state.data.translations);

  const [errorMail, setErrorMail] = useState(true);
  const [errorContent, setErrorContent] = useState(true);

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

  /*useEffect(() => {
    console.log("coucou");
  }, [content.current.children[0].children[1][0].value]);*/

  const formContentError = (e) => {
    e.preventDefault();
    //console.log(content.current.children[0][0].value);
    //console.log(e.target.value.length);
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
      SecureToken: "7bef508f-44aa-4566-ad18-bbbf44636155",
      To: "contact@pierre-le-developpeur.com",
      From: "contact@pierre-le-developpeur.com",
      Subject: "Site pierre le developpeur",
      Body:
        "email : " +
        mail.current.children[0].children[1][0].value +
        " message : " +
        content.current.children[0].children[1][0].value,
    };
    //const elastic = structuredClone(elasti);
    //console.log(document.querySelector(".contentForMail").value);
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

  return (
    <div className="contactField">
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
      {errorContent === false && errorMail === false ? (
        <div className="buttonAndBackground send elements">
          <button
            className="button"
            onClick={(e) => sendMail(content, mail, e)}
          >
            {language === "FR" ? contact.french.button : contact.english.button}
          </button>
        </div>
      ) : (
        <div className="buttonAndBackground cantSend elements">
          <button className="button ">
            {language === "FR"
              ? errorMail === true
                ? contact.french.error_mail
                : contact.french.error_content
              : errorMail === true
              ? contact.english.error_mail
              : contact.english.error_content}
          </button>
        </div>
      )}
    </div>
  );
}
export default Contact;
