import { useSelector } from "react-redux";
import "./contact.css";
import { useRef, useState } from "react";
import LikeButton from "../LikeButton";
import TextArea from "../TextArea";

//import "./smtp";

function Contact({ likeId, recoId }) {
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
    setInputMailValue(e.target.value);
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(e.target.value)) {
      setErrorMail(false);
    } else {
      setErrorMail(true);
      //setSendingError(false);
    }
  };

  const formContentError = (e) => {
    e.preventDefault();
    //console.log(content.current.children[0][0].value);
    //console.log(e.target.value.length);
    setInputContentValue(e.target.value);

    if (e.target.value.length > 6) {
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
        mail.current.value +
        " message : " +
        content.current.children[0][0].value,
    };
    //const elastic = structuredClone(elasti);
    //console.log(document.querySelector(".contentForMail").value);
    window.Email.send(elastic).then((message) => {
      if (message === "OK") {
        setSending(true);
        setSendingError("");
      } else {
        setSending(false);
        setSendingError(message);
        window.open(
          "mailto:contact@pierre-le-developpeur.com?subject=Contact pierre le developpeur&body=Body" +
            mail.current.value
        );
      }
    });
  };

  return (
    <div className="contactField">
      <div className="elements">
        <TextArea
          props={{
            french: translations.french.recommendation,
            english: translations.english.recommendation,
            like: likes[4]._id,
            links: null,
            edit: false,
          }}
        ></TextArea>
      </div>
      <div className="cvAndMail">
        <div className="buttonAndBackground elements">
          {language === "FR" ? (
            <a
              download="CV_aubree_pierre.pdf"
              href={contact.french.cv}
              target="_blank"
            >
              <button className="button">
                {language === "FR" ? "Telechargez mon C.V" : "Download my C.V"}
              </button>
            </a>
          ) : (
            <a
              download="CV_aubree_pierre.pdf"
              href={contact.english.cv}
              target="_blank"
            >
              <button className="button">
                {language === "FR" ? "Telechargez mon C.V" : "Download my C.V"}
              </button>
            </a>
          )}
        </div>
        <div className="inputMail elements">
          <input
            type="mail"
            placeholder={
              language === "FR"
                ? contact.french.placeholder_mail
                : contact.english.placeholder_mail
            }
            onChange={formMailError}
            ref={mail}
          ></input>
        </div>
      </div>
      <div className="elements" ref={content} onChange={formContentError}>
        <TextArea
          props={{
            french: contact.french.content,
            english: contact.english.content,
            like: likes[0]._id,
            links: null,
            edit: true,
          }}
        ></TextArea>
      </div>
      {errorContent === false && errorMail === false ? (
        <div className="buttonAndBackground send">
          <button
            className="button"
            onClick={(e) => sendMail(content, mail, e)}
          >
            {language === "FR" ? contact.french.button : contact.english.button}
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Contact;
