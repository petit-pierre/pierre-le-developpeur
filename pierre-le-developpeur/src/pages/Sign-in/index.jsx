import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokenThunk } from "../../thunkActionsCreator";
import "./signin.css";
import Snow from "../../components/Snow";
import Contact from "../../components/Contact";

function SignIn() {
  const name = useRef();
  const pass = useRef();
  const remember = useRef();
  const dispatch = useDispatch();
  const [mailError, setMailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [sendingError, setSendingError] = useState(false);
  const navigate = useNavigate();
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPassValue, setInputPassValue] = useState("");
  const language = useSelector((state) => state.data.language);
  const contact = useSelector((state) => state.data.translations);
  const translations = useSelector((state) => state.data.translations);
  const discuss = useSelector((state) => state.data.contactMenu);
  const likes = useSelector((state) => state.data.likes);

  if (
    language !== null &&
    contact !== null &&
    discuss !== null &&
    translations !== null &&
    likes !== null
  ) {
    const formNameError = (e) => {
      setInputNameValue(e.target.value);
      const emailRegExp = new RegExp(
        "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+"
      );
      if (emailRegExp.test(e.target.value)) {
        setMailError(false);
      } else {
        setMailError(true);
        setSendingError(false);
      }
    };

    const formPassError = (e) => {
      setInputPassValue(e.target.value);
      if (e.target.value !== "") {
        setPassError(false);
      } else {
        setPassError(true);
        setSendingError(false);
      }
    };

    const submit = async (e) => {
      e.preventDefault();
      const emailRegExp = new RegExp(
        "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+"
      );
      const email = name.current.value;
      const password = pass.current.value;
      const rememberChecked = remember.current.checked;
      if (emailRegExp.test(name.current.value) && pass.current.value !== "") {
        const setTokenResult = await dispatch(
          setTokenThunk(email, password, rememberChecked)
        );

        if (setTokenResult) {
          navigate("/User");
        } else {
          setSendingError(true);
        }
      }
    };
    const Lscreen = window.innerWidth;

    return (
      <div>
        <Contact props={{ likeId: "65dc9d6a700bae9e300a79aa" }} />
        <main className="signPage">
          <section className="signin">
            <h1>{language === "FR" ? "Connexion" : "Sign In"} </h1>

            {language === "FR" ? (
              <div className="backOfficeTxt">
                <p>
                  Derrière cette porte se cache mon espace : le back-office de
                  ce portfolio !
                </p>
                <p>
                  C’est ici que je poste mes projets, que j’ajoute des
                  compétences ou que je modifie le contenu de ce site.
                </p>
                <p>Je suis le seul à avoir la clé 🗝️.</p>
              </div>
            ) : (
              <div className="backOfficeTxt">
                <p>
                  Behind this door lies my space: the back office of this
                  portfolio!
                </p>
                <p>
                  This is where I post my projects, add skills, or modify the
                  content of this site.
                </p>
                <p>I’m the only one with the key 🗝️.</p>
              </div>
            )}

            <form onSubmit={(e) => submit(e)}>
              <div className="username">
                <label htmlFor="username">E-mail:</label>
                <input
                  ref={name}
                  type="text"
                  id="username"
                  onChange={formNameError}
                />
              </div>
              <div className="password">
                <label htmlFor="password">
                  {language === "FR" ? "Mot de passe:" : "Password:"}
                </label>
                <input
                  ref={pass}
                  type="password"
                  id="password"
                  onChange={formPassError}
                />
              </div>
              <div>
                <input type="checkbox" id="remember-me" ref={remember} />
                <label htmlFor="remember-me" className="remember">
                  {language === "FR" ? "Laisse-moi connecté" : "Remember me"}
                </label>
              </div>

              {mailError || passError === true ? (
                <p className="error">
                  {language === "FR"
                    ? "e-mail invalide ou mot de passe vide"
                    : "Invalid email format or empty password"}
                </p>
              ) : (
                <button className="connectMe">
                  <img src="../assets/logo_key.png" alt="logo key"></img>{" "}
                </button>
              )}
            </form>
          </section>

          {sendingError === true ? (
            language === "FR" ? (
              <img src="../assets/closed-door-fr.png" alt="door"></img>
            ) : (
              <img src="../assets/closed-door-eng.png" alt="door"></img>
            )
          ) : (
            <img src="../assets/door.png" alt="door"></img>
          )}

          <div className="snow">{Lscreen > 650 ? <Snow></Snow> : ""}</div>
        </main>{" "}
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/Sign-in");
    }, 500);
  }
}
export default SignIn;
