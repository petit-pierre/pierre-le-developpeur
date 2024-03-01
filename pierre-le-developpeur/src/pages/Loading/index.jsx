import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { NavLink } from "react-router-dom";
import LoadingHeader from "../../components/LoadingHeader";
import "./parralax.css";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userSlice } from "../../Slices/userSlice";
import burgerIcon from "../../assets/burger.svg";

function Loading() {
  const language = useSelector((state) => state.data.language);
  const [burger, setBurger] = useState(false);
  const dispatch = useDispatch();
  function burgerOff() {
    setBurger(false);
  }
  function changeBurger() {
    setBurger(!burger);
  }

  function changeLanguage() {
    language === "FR"
      ? dispatch(userSlice.actions.setLanguage("ENG"))
      : dispatch(userSlice.actions.setLanguage("FR"));
  }
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
        <ParallaxLayer offset={1} speed={0}>
          <div className="purple">
            <div className="loadingHeader ">
              <div className="topHeader">
                <NavLink to="/Home" className="title">
                  <h1 className="purpleTitle">Pierre le developpeur</h1>
                </NavLink>
                <div id="icons" onClick={changeBurger}>
                  <img src={burgerIcon} alt="burger menu"></img>
                </div>
              </div>
              <nav id="nav" className={burger === true ? "active" : ""}>
                <div className="headerSpaced"></div>
                <div className="ul">
                  <div className="li">
                    <NavLink onClick={burgerOff}>
                      {" "}
                      {language === "FR" ? "accueil" : "welcome"}
                    </NavLink>
                  </div>
                  <div className="li">
                    <NavLink onClick={burgerOff}>Contact</NavLink>
                  </div>
                  <div className="li">
                    <NavLink onClick={burgerOff}>
                      {" "}
                      {language === "FR" ? "Compétences" : "Skills"}
                    </NavLink>
                  </div>
                  <div className="li">
                    <NavLink onClick={burgerOff}>
                      {language === "FR" ? "Projets" : "Projects"}
                    </NavLink>
                  </div>
                  <div className="li language">
                    <a> {language} </a>
                    <input
                      type="checkbox"
                      className="demo5"
                      id="demo5"
                      onClick={changeLanguage}
                    />
                    <label for="demo5"></label>
                  </div>
                </div>
              </nav>

              <img
                src="./assets/pierre.png"
                className="maGanache"
                alt="profil"
              ></img>
            </div>
            <div className="welcome">
              <NavLink to="/Home">
                <h2 className="enter">Enter</h2>
              </NavLink>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}

export default Loading;
