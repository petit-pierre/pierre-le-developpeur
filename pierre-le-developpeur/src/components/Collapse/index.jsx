import Arrow from "../../assets/Vector.png";
import "./collapse.css";
import React, { useState } from "react";

function Collapse({ name, content }) {
  const [open, setOPen] = useState(false);
  const toggle = () => {
    setOPen(!open);
  };
  return (
    <div className="body">
      <div className="headerCollapse">
        <p className="titleCollapse">{name}</p>
        <img
          className={open ? "openArrow" : "closedArrow"}
          src={Arrow}
          alt="Arrow"
          onClick={toggle}
        />
      </div>

      <div className={open ? "content-show" : "content-parent"}>
        <p className="content">{content}</p>
      </div>
      <div className="blank"></div>
    </div>
  );
}

export default Collapse;
