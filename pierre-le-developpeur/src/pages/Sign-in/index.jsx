import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokenThunk } from "../../thunkActionsCreator";
import Header from "../../components/Header";
import "./signin.css";
import Snow from "../../components/Snow";

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

  const formNameError = (e) => {
    setInputNameValue(e.target.value);
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
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
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
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

  return (
    <main className="signPage">
      <section className="signin">
        <h1>Sign In</h1>
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
            <label htmlFor="password">Password:</label>
            <input
              ref={pass}
              type="password"
              id="password"
              onChange={formPassError}
            />
          </div>
          <div>
            <input type="checkbox" id="remember-me" ref={remember} />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {mailError || passError === true ? (
            <button className="error">
              Invalid email format or empty password
            </button>
          ) : (
            <button>Sign In</button>
          )}
          {sendingError && <p className="error">Invalid email or password</p>}
        </form>
      </section>

      <img src="../assets/door.png" alt="door"></img>
      <div className="snow">
        <Snow></Snow>
      </div>
    </main>
  );
}
export default SignIn;
