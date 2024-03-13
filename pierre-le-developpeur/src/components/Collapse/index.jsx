import Arrow from "../../assets/Vector.png";
import "./collapse.css";
import React, { useState } from "react";

function Collapse({ name, content }) {
  const [open, setOPen] = useState(false);
  const toggle = () => {
    setOPen(!open);
  };
  return (
    <div className="collapseField">
      <div
        className={open ? "headerCollapse open" : "headerCollapse close"}
        onClick={toggle}
      >
        <span className="titleCollapse">{name}</span>
        <img
          className={open ? "openArrow" : "closedArrow"}
          src={Arrow}
          alt="Arrow"
        />
      </div>

      <div className={open ? "content-show" : "content-parent"}>
        <div className="content">{content}</div>
      </div>
      <div className="blank"></div>
    </div>
  );
}

export default Collapse;
