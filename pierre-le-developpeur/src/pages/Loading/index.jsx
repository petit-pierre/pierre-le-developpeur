import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { NavLink } from "react-router-dom";
import "./parralax.css";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userSlice } from "../../Slices/userSlice";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function Loading() {
  const begin =
    "Je suis un développeur Web spécialisé front-end mais pas seulement . Mon parcours de DJ/Liveur et VJ m'a apporté de solides compétences en M.A.O et vidéo . Les arts plastiques sont aussi une corde a mon arc qui me permet d’être a l'aise avec la conception visuel (P.A.O, communication visuel) . Ma curiosité et ma passion me poussent a m’intéresser sérieusement a d'autres aspects de mon métier tels que le développement back-end .";
  const end =
    "Finalement, mon expérience de vieux baroudeur de l'informatique me permet une vision profonde de la programmation et quelques compétences exotiques comme le langage BASIC . Je fait des algorithmes artistiques mais ne me croyez pas sur parole, venez donc jeter un œil a mes travaux pour peut que ces quelques lignes atypiques piquent votre curiosité .";
  const [text, setText] = useState(begin);

  setInterval(() => {
    text === begin ? setText(end) : setText(begin);
  }, 15000);

  return (
    <main className="parralaxField">
      <div className="loadingTopHeader">
        <div className="header">
          <div className="topHeader">
            <NavLink to="/Home" className="title">
              <h1 className="purpleTitle">Pierre le developpeur</h1>
            </NavLink>
          </div>
        </div>
      </div>
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
            <div className="loadingHeader">
              <Header></Header>
            </div>
            <div className="welcome">
              <img
                src="./assets/particules.gif"
                className="particules"
                alt="particules"
              ></img>
              <div className="welcomeText">
                <p> {text} </p>
                {text === begin ? <p>1/2</p> : <p>2/2</p>}
                <div className="loading">
                  <div className="dot1"></div>
                  <div className="dot2"></div>
                  <div className="dot3"></div>
                </div>
                <p className="end"> </p>
              </div>
              <div className="cofeeContainer">
                <img
                  src="./assets/cofee.png"
                  className="cofee"
                  alt="cofee"
                ></img>
                <div className="smoke">
                  <div className="cofeeSmoke"></div>
                  <div className="cofeeSmoke secondSmoke"></div>
                  <div className="cofeeSmoke"></div>
                </div>
              </div>
            </div>
            <Footer></Footer>
          </div>
        </ParallaxLayer>
      </Parallax>
    </main>
  );
}

export default Loading;
