import { useSelector } from "react-redux";
import "./contact.css";
import { useRef, useState } from "react";
//import "./smtp";

function Contact(likeId) {
  const contact = useSelector((state) => state.data.translations);
  const language = useSelector((state) => state.data.language);

  const [errorMail, setErrorMail] = useState(true);
  const [errorContent, setErrorContent] = useState(true);

  const [error, setError] = useState(false);
  const [sendingError, setSendingError] = useState(false);
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
    setInputContentValue(e.target.value);
    console.log(inputContentValue.length);
    if (inputContentValue.length > 6) {
      setErrorContent(false);
    } else {
      setErrorContent(true);
      //setSendingError(false);
    }
  };

  const sendMail = (content, mail, e) => {
    e.preventDefault();
    const elastic = {
      SecureToken: "05a438b4-7517-4e7a-b0ed-133a878decca",
      To: "contact@mariage-en-morgan.fr",
      From: "contact@mariage-en-morgan.fr",
      Subject: "Site pierre le developpeur",
      Body: document.querySelector(".contentForMail").value,
    };
    //const elastic = structuredClone(elasti);
    //console.log(document.querySelector(".contentForMail").value);
    window.Email.send(elastic).then((message) =>
      message === "OK" ? setSending(true) : setSendingError(true)
    );
  };

  return (
    <div className="contactField">
      <div className="recommendation">
        <div className="reco">
          <blockquote>
            {" "}
            "
            {language === "FR"
              ? contact.french.recommendation
              : contact.english.recommendation}
            "{" "}
          </blockquote>
        </div>
        <div className="snow"></div>
        <div className="snowBackground"></div>
      </div>

      <div className="contactPlace">
        <div className="messageAndMail">
          <div className="mailAndSend">
            <div className="mailAndBackground">
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
              <div className="snow"></div>
              <div className="snowBackground"></div>
            </div>
            <div className="textAreaAndBackground">
              <textarea
                placeholder={
                  language === "FR"
                    ? contact.french.placeholder_content
                    : contact.english.placeholder_content
                }
                onChange={formContentError}
                ref={content}
                className="contentForMail"
              ></textarea>
              <div className="snow"></div>
              <div className="snowBackground"></div>
            </div>
            {errorContent === false && errorMail === false ? (
              <div className="buttonAndBackground">
                <button onClick={(e) => sendMail(content, mail, e)}>
                  {language === "FR"
                    ? contact.french.button
                    : contact.english.button}
                </button>
                <div className="snow"></div>
                <div className="snowBackground"></div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="errorAndContact">
          <div className="contentAndBackground">
            <div className="contactContent">
              {language === "FR" ? (
                <div>
                  {<p>{contact.french.content}</p>}
                  {errorContent === true ? (
                    <p>{contact.french.error_content}</p>
                  ) : (
                    ""
                  )}
                  {errorMail === true ? <p>{contact.french.error_mail}</p> : ""}
                  {sendingError === true ? <p>erreur reseau</p> : ""}
                  {sending === true ? <p>{contact.french.succes} </p> : ""}
                </div>
              ) : (
                <div>
                  {<p> {contact.english.content} </p>}
                  {errorContent === true ? (
                    <p>{contact.english.error_content}</p>
                  ) : (
                    ""
                  )}
                  {errorMail === true ? (
                    <p>{contact.english.error_mail}</p>
                  ) : (
                    ""
                  )}
                  {sendingError === true ? <p>networck error</p> : ""}
                  {sending === true ? <p>{contact.english.succes} </p> : ""}
                </div>
              )}
            </div>
            <div className="snow"></div>
            <div className="snowBackground"></div>
          </div>
          <div className="buttonAndBackground">
            <a
              download="CV_aubree_pierre.pdf"
              href={contact.french.cv}
              target="_blank"
            >
              <button>
                {language === "FR" ? "Telechargez mon C.V" : "Download my C.V"}
              </button>
            </a>
            <div className="snow"></div>
            <div className="snowBackground"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;