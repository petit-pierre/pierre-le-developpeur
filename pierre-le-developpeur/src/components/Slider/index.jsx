import "./slider.css";

function Slider(sliders) {
  console.log(sliders);
  return (
    <div className="sliderField">
      {sliders.sliders.map((slide) => (
        <div key={slide._id} className="sliderDiv">
          <img src={slide.picture} alt={slide.alt} className="sliderPicture" />
        </div>
      ))}
    </div>
  );
}

export default Slider;
