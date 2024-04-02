import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
    <Link to={"/Project/" + project.french_title}>
      <div className="cardField">
        <div className="like miniLike likeSlide">
          <LikeButton id={project.slider_likes_id}></LikeButton>
        </div>
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

          <div className="like">
            <LikeButton id={project.content_likes_id}></LikeButton>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Cards;
