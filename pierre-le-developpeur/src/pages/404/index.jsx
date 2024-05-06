import { useSelector } from "react-redux";
import "./404.css";

function Error404() {
  const language = useSelector((state) => state.data.language);
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
    </div>
  );
}

export default Error404;
