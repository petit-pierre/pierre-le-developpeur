import { useSelector } from "react-redux";
import "./404.css";
import Contact from "../../components/Contact";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Error404() {
  //const navigate = useNavigate();
  const language = useSelector((state) => state.data.language);
  const contact = useSelector((state) => state.data.translations);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);
  const likes = useSelector((state) => state.data.likes);

  const navigate = useNavigate();

  if (
    language !== null &&
    contact !== null &&
    discuss !== null &&
    translations !== null &&
    likes !== null
  ) {
    return (
      <div className="error404">
        <h1 className="errorRedirect">
          {language === "FR"
            ? "404 il n'y a personne ici !"
            : "404 Nobody's here !"}
        </h1>
        <div className="travoltaContainer">
          <img
            src="../assets/so-really.gif"
            alt="meme travolta"
            className="travolta"
          ></img>
        </div>

        <Contact props={{ likeId: "65dc9d6a700bae9e300a79aa" }} />
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/404");
    }, 500);
  }
}

export default Error404;
