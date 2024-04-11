import "./button.css";

function Button({ props }) {
  return (
    <div className="buttonDiv">
      <div className={props.style + " buttonAndBackground send elements"}>
        <button className="button visible">{props.title}</button>
      </div>
    </div>
  );
}
export default Button;
