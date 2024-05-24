import "./button.css";

function Button({ props }) {
  return (
    <div className="buttonDiv">
      <div className={props.send === true ? "send" : "cantSend"}>
        <div className={props.style + " buttonAndBackground elements"}>
          <button
            className={props.send === true ? "button visible" : "button"}
            tabIndex={-1}
          >
            {props.title}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Button;
