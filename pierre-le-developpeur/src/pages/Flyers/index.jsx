import { useSelector } from "react-redux";
import "./Flyers.css";
import Contact from "../../components/Contact";
import { useNavigate } from "react-router-dom";

function Flyers() {
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
      <div className="flyers">
        <p>coucou</p>
        <Contact props={{ likeId: "65dc9d6a700bae9e300a79aa" }} />
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/Flyers");
    }, 500);
  }
}

export default Flyers;
