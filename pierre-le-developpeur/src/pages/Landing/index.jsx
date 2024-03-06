import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { NavLink } from "react-router-dom";
import "./parralax.css";
import "./header.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function Landing() {
  const language = useSelector((state) => state.data.language);
  const begin = {
    french:
      "Je suis un développeur Web spécialisé front-end mais pas seulement . Mon parcours de DJ/Liveur et VJ m'a apporté de solides compétences en M.A.O et vidéo . Les arts plastiques sont aussi une corde a mon arc qui me permet d’être a l'aise avec la conception visuel (P.A.O, communication visuel) . Ma curiosité et ma passion me poussent a m’intéresser sérieusement a d'autres aspects de mon métier tels que le développement back-end .",
    english:
      "I am a front-end web developer, but not only that. My background as a DJ, live performer, and VJ has given me strong skills in music production and video. Visual arts are also an additional string to my bow, allowing me to feel comfortable with visual design (graphic design, visual communication). My curiosity and passion drive me to seriously explore other aspects of my profession, such as back-end development.",
  };
  const end = {
    french:
      "Finalement, mon expérience de vieux baroudeur de l'informatique me permet une vision profonde de la programmation et quelques compétences exotiques comme le langage BASIC . Je fait des algorithmes artistiques mais ne me croyez pas sur parole, venez donc jeter un œil a mes travaux pour peut que ces quelques lignes atypiques piquent votre curiosité .",
    english:
      "Finally, my experience as a seasoned computer adventurer allows me a deep insight into programming, along with some exotic skills like the BASIC language. I create artistic algorithms, but don’t just take my word for it—come take a look at my work! Perhaps these unconventional lines will pique your curiosity.",
  };
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
      <Parallax pages={2} style={{ top: "0", left: "0" }} className="animation">
        <ParallaxLayer offset={0} speed={0.1}>
          <div className="animation_layer parallax" id="artback">
            <img src="./assets/fond.png" className="image" alt="parralax"></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.2}>
          <div className="animation_layer parallax" id="mountain">
            <img
              src="./assets/layer1.png"
              className="image"
              alt="parralax"
            ></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div className="animation_layer parallax" id="jungle1">
            <img
              src="./assets/layer2.png"
              className="image"
              alt="parralax"
            ></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.4}>
          <div className="animation_layer parallax" id="jungle2">
            <img
              src="./assets/layer3.png"
              className="image"
              alt="parralax"
            ></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <div className="animation_layer parallax" id="jungle3">
            <img
              src="./assets/layer4.png"
              className="image"
              alt="parralax"
            ></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.6}>
          <div className="animation_layer parallax" id="jungle4">
            <img
              src="./assets/layer5.png"
              className="image"
              alt="parralax"
            ></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0}>
          <div className="purple">
            <Header></Header>

            <div className="welcome">
              <img
                src="./assets/particules.gif"
                className="particules"
                alt="particules"
              ></img>
              <div className="welcomeText">
                <p> {language === "FR" ? text.french : text.english} </p>
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

export default Landing;
