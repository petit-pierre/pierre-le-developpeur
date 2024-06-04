import React from "react";
import { useSelector } from "react-redux";

export const CarouselItem = ({ item, width, mini }) => {
  const language = useSelector((state) => state.data.language);
  return (
    <div className="carousel-item" style={{ width: width }}>
      <img
        className={mini === true ? "carousel-img-mini" : "carousel-img"}
        src={item.picture}
        alt="slider"
      />
      {mini === false && item.french_content !== "nothing" ? (
        language === "FR" ? (
          <div className="sliderTextDiv">
            <p className="sliderContent">{item.french_content}</p>
          </div>
        ) : (
          <div className="sliderTextDiv">
            <p className="sliderContent">{item.english_content}</p>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};
