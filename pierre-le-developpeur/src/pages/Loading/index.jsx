import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useNavigate } from "react-router-dom";
import LoadingHeader from "../../components/LoadingHeader";

function Loading() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/Home");
  }, 1500);

  return (
    <main className="parralaxField">
      <LoadingHeader />
      <Parallax pages={2} style={{ top: "0", left: "0" }} class="animation">
        <ParallaxLayer offset={0} speed={0.1}>
          <div class="animation_layer parallax" id="artback">
            <img src="./assets/fond.png" className="image"></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.2}>
          <div class="animation_layer parallax" id="mountain">
            <img src="./assets/layer1.png" className="image"></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div class="animation_layer parallax" id="jungle1">
            <img src="./assets/layer2.png" className="image"></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4}>
          <div class="animation_layer parallax" id="jungle2">
            <img src="./assets/layer3.png" className="image"></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <div class="animation_layer parallax" id="jungle3">
            <img src="./assets/layer4.png" className="image"></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.6}>
          <div class="animation_layer parallax" id="jungle4">
            <img src="./assets/layer5.png" className="image"></img>
          </div>
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}

export default Loading;
