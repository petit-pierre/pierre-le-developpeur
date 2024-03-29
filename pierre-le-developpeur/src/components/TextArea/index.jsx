import { useSelector } from "react-redux";
import "./textArea.css";
import { useEffect } from "react";

function TextArea({ props }) {
  const language = useSelector((state) => state.data.language);

  //window.addEventListener("resize", console.log("coucou"));

  function setTailleHeight(oEvent) {
    var iHeight = "auto";
    this.style.height = iHeight;
    if (this.scrollHeight > 0) {
      iHeight = this.scrollHeight + "px";
      this.style.height = iHeight;
    }
    if (this.value === "") {
      this.style.removeProperty("height");
    }
  }

  function handleResize() {
    var oForm = document.forms["myForm"],
      aoTextArea = oForm.getElementsByClassName("wdgAutoSize");
    for (let oTextArea of aoTextArea) {
      /* vous pouver aussi utiliser l'event keyup */
      oTextArea.addEventListener("input", setTailleHeight);
      //si le textarea n'est pas vide au chargement de la page
      setTailleHeight.call(oTextArea, true);
    }
  }

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    // Attach the event listener to the window object
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [language]);

  return (
    <div className="textArea">
      <form id="myForm" className="mise-en-page">
        <textarea
          id="champText"
          className="wdgAutoSize"
          spellCheck={false}
          readOnly={true}
          value={language === "FR" ? props.french : props.english}
        >
          {}
        </textarea>
      </form>
    </div>
  );
}

export default TextArea;
