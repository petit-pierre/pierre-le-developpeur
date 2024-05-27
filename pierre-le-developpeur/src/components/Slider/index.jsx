import { useEffect, useState, useRef } from "react";
import "./slider.css";
import { CarouselItem } from "./CarouselItem";
import LikeButton from "../LikeButton";

function Slider({ sliders, mini, likeId }) {
  let sortedSlider = [];
  for (let slide of sliders) {
    console.log(slide);
    if (slide.alt !== "Video" || slide.alt !== "TextPicture") {
      sortedSlider.push(slide);
    }
  }
  console.log(sortedSlider);

  const [currentIndex, setCurrentIndex] = useState(0);

  //swipe tactile//

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (sortedSlider.length > 1) {
      if (touchStart - touchEnd > 150) {
        nextPicture();
      }

      if (touchStart - touchEnd < -150) {
        previousPicture();
      }
    }
  }
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (mini === true) {
      nextPicture();
    }
  }, 6000);

  //changement d'index//

  const previousPicture = () => {
    const index = currentIndex;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? sortedSlider.length - 1 : index - 1;
    setCurrentIndex(newIndex);
  };

  const nextPicture = () => {
    const index = currentIndex;
    const isLastSlide = currentIndex === sortedSlider.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div
      className="sliderField sliderContainer"
      onTouchStart={mini === false ? (e) => handleTouchStart(e) : null}
      onTouchMove={mini === false ? (e) => handleTouchMove(e) : null}
      onTouchEnd={mini === false ? (e) => handleTouchEnd(e) : null}
    >
      <div className="like">
        <LikeButton
          propsLike={{
            id: likeId,
            color: "black",
          }}
        ></LikeButton>
      </div>
      <div
        className="inner"
        style={{ transform: `translate(-${currentIndex * 100}%)` }}
      >
        {sortedSlider.map((slide) => {
          return (
            <CarouselItem
              key={`${slide._id}`}
              item={slide}
              mini={mini}
              width={"100%"}
            />
          );
        })}
      </div>
      {sortedSlider.length > 1 && mini === false ? (
        <div className="arrowAndCounter">
          <button
            tabIndex={0}
            className="buttonArrow arrowLeft"
            onClick={previousPicture}
          >
            <img
              className="
              "
              src="http://pierre-le-developpeur.com/assets/arrow_left.png"
              alt="fleche vers la gauche"
            ></img>
          </button>
          <button
            tabIndex={0}
            className="buttonArrow arrowRight"
            onClick={nextPicture}
          >
            <img
              className=""
              src="http://pierre-le-developpeur.com/assets/arrow_right.png"
              alt="fleche vers la droite"
            ></img>
          </button>
          <p className="counter">
            {currentIndex + 1}/{sortedSlider.length}
          </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Slider;
