import { NavLink } from "react-router-dom";
import "./header.css";
import { useState } from "react";
import burgerIcon from "../../assets/burger.svg";
import { userSlice } from "../../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const language = useSelector((state) => state.data.language);
  const thanks = useSelector((state) => state.data.thanks);
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
    <div className="headerfield">
      <div className="header ">
        <div className="topHeader">
          <NavLink to="/Home" className="title">
            <h1>Pierre le developpeur</h1>
          </NavLink>
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
          <div id="icons" onClick={changeBurger}>
            <img src={burgerIcon} alt="burger menu" className="icons"></img>
          </div>
        </nav>
        {thanks === true ? (
          <img
            src="./assets/thanks.png"
            className="maGanache"
            alt="profil"
          ></img>
        ) : (
          <img
            src="./assets/pierre.png"
            className="maGanache"
            alt="thank you"
          ></img>
        )}
      </div>
    </div>
  );
}

export default Header;
