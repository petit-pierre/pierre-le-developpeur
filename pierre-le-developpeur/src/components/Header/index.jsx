import { NavLink } from "react-router-dom";
import "./header.css";
import { useState } from "react";
import burgerIcon from "../../assets/burger.svg";
import { userSlice } from "../../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
//import { HashLink } from "react-router-hash-link";
import { HashLink, HashLink as Link } from "react-router-hash-link";

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

  function changeLanguage() {
    language === "FR"
      ? dispatch(userSlice.actions.setLanguage("ENG"))
      : dispatch(userSlice.actions.setLanguage("FR"));
  }
  return (
    <div>
      <div className="headerfield">
        <div className="header ">
          <div className="topHeader">
            <NavLink to="/" className="title">
              <h1>Pierre le developpeur</h1>
            </NavLink>
          </div>
          <nav id="nav" className={burger === true ? "active" : ""}>
            <div className="headerSpaced"></div>
            <div className="ul">
              <div className="logos li">
                <a
                  href="https://github.com/petit-pierre"
                  target="_blank"
                  className="logoLink "
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
                >
                  <img
                    src="http://pierre-le-developpeur.com/assets/logo linkedin.png"
                    alt="logo linkedin"
                    className="logo"
                  ></img>
                </a>
              </div>
              <HashLink onClick={burgerOff} to="/Home#contact">
                <div className="li">Contact</div>
              </HashLink>
              <HashLink onClick={burgerOff} to="/Home#competences">
                <div className="li">
                  {" "}
                  {language === "FR" ? "Compétences" : "Skills"}
                </div>
              </HashLink>
              <HashLink onClick={burgerOff} to="/Home#projets">
                <div className="li">
                  {language === "FR" ? "Projets" : "Projects"}
                </div>
              </HashLink>
              <div className="li language">
                <a> {language} </a>

                <input
                  type="checkbox"
                  className="demo5"
                  id="demo5"
                  onClick={changeLanguage}
                />
                <label htmlFor="demo5"></label>
              </div>
            </div>
            <div id="icons" onClick={changeBurger}>
              <img src={burgerIcon} alt="burger menu" className="icons"></img>
            </div>
          </nav>
          <HashLink onClick={burgerOff} to="/Home#accueil">
            <img
              src="http://pierre-le-developpeur.com/assets/pierre.png"
              className="maGanache"
              alt="thank you"
            ></img>
          </HashLink>
        </div>
      </div>
      <div className="placeforheader"></div>
    </div>
  );
}

export default Header;
