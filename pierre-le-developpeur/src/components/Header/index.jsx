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
              <div className="li">
                <HashLink onClick={burgerOff} to="/Home#accueil">
                  {" "}
                  {language === "FR" ? "accueil" : "welcome"}
                </HashLink>
              </div>
              <div className="li">
                <HashLink onClick={burgerOff} to="/Home#contact">
                  Contact
                </HashLink>
              </div>
              <div className="li">
                <HashLink onClick={burgerOff} to="/Home#competences">
                  {" "}
                  {language === "FR" ? "Compétences" : "Skills"}
                </HashLink>
              </div>
              <div className="li">
                <HashLink onClick={burgerOff} to="/Home#projets">
                  {language === "FR" ? "Projets" : "Projects"}
                </HashLink>
              </div>
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

          <img
            src="./assets/pierre.png"
            className="maGanache"
            alt="thank you"
          ></img>
        </div>
      </div>
      <div className="placeforheader"></div>
    </div>
  );
}

export default Header;
