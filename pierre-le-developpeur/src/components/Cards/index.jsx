import { useSelector } from "react-redux";
import LikeButton from "../LikeButton";
import Slider from "../Slider";
import "./cards.css";
import React, { useState } from "react";

function Cards({ project }) {
  const language = useSelector((state) => state.data.language);
  const [open, setOPen] = useState(false);
  const toggle = () => {
    setOPen(!open);
  };
  return (
    <div className="cardField">
      <div className="cardSlide">
        <Slider
          sliders={project.sliders}
          mini={true}
          likeId={project.slider_likes_id}
        ></Slider>
      </div>
      <div className="cardResum">
        {language === "FR" ? (
          <p> {project.french_resum} </p>
        ) : (
          <p> {project.english_resum} </p>
        )}

        <div className="likeProject">
          <LikeButton id={project.content_likes_id}></LikeButton>
        </div>
      </div>
    </div>
  );
}

export default Cards;
