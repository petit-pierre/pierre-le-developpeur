import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { NavLink } from "react-router-dom";
import LoadingHeader from "../../components/LoadingHeader";
import "./parralax.css";

function Loading() {
  return (
    <main className="parralaxField">
      <LoadingHeader />
      <Parallax pages={2.3} style={{ top: "0", left: "0" }} class="animation">
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
        <ParallaxLayer offset={1} speed={0}>
          <div className="purple">
            <div className="welcome">
              <NavLink to="/Home">
                <h2 className="enter">Enter</h2>
              </NavLink>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0}>
          <div className="purple"></div>
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}

export default Loading;
