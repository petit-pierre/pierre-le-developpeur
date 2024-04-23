import "./header.css";
import { useState } from "react";
import burgerIcon from "../../assets/burger.svg";
import { userSlice } from "../../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";

function Header() {
  const language = useSelector((state) => state.data.language);
  const [burger, setBurger] = useState(false);
  const dispatch = useDispatch();
  function burgerOff() {
    setBurger(false);
  }
  function changeBurger() {
    setBurger(!burger);
  }
  function changeLanguageByKey(evt) {
    if (evt.code === "Enter") {
      changeLanguage();
    }
  }
  function changeLanguage() {
    language === "FR"
      ? dispatch(userSlice.actions.setLanguage("ENG"))
      : dispatch(userSlice.actions.setLanguage("FR"));
  }
  return (
    <div className="allHeader">
      <div className="headerfield">
        <div className="header ">
          <nav id="nav" className={burger === true ? "active" : ""}>
            <div className="ul">
              <div className="logos li">
                <a
                  href="https://github.com/petit-pierre"
                  target="_blank"
                  className="logoLink "
                  rel="noopener noreferrer"
                  tabIndex={2}
                >
                  <img
                    src="http://pierre-le-developpeur.com/assets/logo github.png"
                    alt="logo github"
                    className="logo"
                  ></img>
                </a>
                <a
                  href="https://www.linkedin.com/in/pierre-aubrée/"
                  target="_blank"
                  className="logoLink"
                  rel="noopener noreferrer"
                  tabIndex={3}
                >
                  <img
                    src="http://pierre-le-developpeur.com/assets/logo linkedin.png"
                    alt="logo linkedin"
                    className="logo"
                  ></img>
                </a>
              </div>
              <HashLink onClick={burgerOff} to="/#accueil" tabIndex={4}>
                <div className="li links">Accueil</div>
              </HashLink>
              <HashLink onClick={burgerOff} to="/#contact" tabIndex={5}>
                <div className="li links">Contact</div>
              </HashLink>
              <HashLink onClick={burgerOff} to="/#competences" tabIndex={6}>
                <div className="li links">
                  {" "}
                  {language === "FR" ? "Compétences" : "Skills"}
                </div>
              </HashLink>
              <HashLink onClick={burgerOff} to="/#projets" tabIndex={7}>
                <div className="li links">
                  {language === "FR" ? "Projets" : "Projects"}
                </div>
              </HashLink>
              <div className="li language links">
                {language}

                <input
                  type="checkbox"
                  className="demo5"
                  id="demo5"
                  onClick={changeLanguage}
                />
                <label
                  htmlFor="demo5"
                  tabIndex={8}
                  onKeyDown={(evt) => changeLanguageByKey(evt)}
                ></label>
              </div>
            </div>
            <div id="icons" onSubmit={changeBurger}>
              <img
                src={burgerIcon}
                alt="burger menu"
                className="icons"
                tabIndex={-1}
              ></img>
            </div>
          </nav>
          <div className="headerLogos">
            <HashLink onClick={burgerOff} to="/#accueil" tabIndex={-1}>
              <img
                src="http://pierre-le-developpeur.com/assets/pierre.png"
                className="maGanache"
                alt="thank you"
                tabIndex={1}
              ></img>
            </HashLink>
          </div>
        </div>
      </div>
      <div className="shape"></div>
      <div className="placeforheader"></div>
    </div>
  );
}

export default Header;
