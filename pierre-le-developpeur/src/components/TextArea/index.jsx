import { useSelector } from "react-redux";
import "./textArea.css";

function TextArea({ props }) {
  const language = useSelector((state) => state.data.language);
  //console.log(french);
  return (
    <div className="textArea">
      <textarea
        disabled={true}
        placeholder={language === "FR" ? props.french : props.english}
      ></textarea>
    </div>
  );
}

export default TextArea;
