import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { NavLink } from "react-router-dom";
import LoadingHeader from "../../components/LoadingHeader";
import "./parralax.css";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { userSlice } from "../../Slices/userSlice";
import burgerIcon from "../../assets/burger.svg";
import Footer from "../../components/Footer";

function Loading() {
  const language = useSelector((state) => state.data.language);
  const [burger, setBurger] = useState(false);
  const dispatch = useDispatch();
  const begin =
    "Je suis un développeur Web spécialisé front-end mais pas seulement . Mon parcours de DJ/Liveur et VJ m'a apporté de solides compétences en M.A.O et vidéo . Les arts plastiques sont aussi une corde a mon arc qui me permet d’être a l'aise avec la conception visuel (P.A.O, communication visuel) . Ma curiosité et ma passion me poussent a m’intéresser sérieusement a d'autres aspects de mon métier tels que le développement back-end .";
  const end =
    "Finalement, mon expérience de vieux baroudeur de l'informatique me permet une vision profonde de la programmation et quelques compétences exotiques comme le langage BASIC . Je fait des algorithmes artistiques mais ne me croyez pas sur parole, venez donc jeter un œil a mes travaux pour peut que ces quelques lignes atypiques piquent votre curiosité .";
  const [text, setText] = useState(begin);

  setInterval(() => {
    text === begin ? setText(end) : setText(begin);
  }, 15000);

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
                <NavLink className="title">
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
              <img
                src="./assets/particules.gif"
                className="particules"
                alt="particules"
              ></img>
              <div className="welcomeText">
                <p> {text} </p>
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
