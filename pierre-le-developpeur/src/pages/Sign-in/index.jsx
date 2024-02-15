import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokenThunk } from "../../thunkActionsCreator";

function SignIn() {
  const name = useRef();
  const pass = useRef();
  const remember = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [sendingError, setSendingError] = useState(false);
  const navigate = useNavigate();
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPassValue, setInputPassValue] = useState("");

  const formNameError = (e) => {
    setInputNameValue(e.target.value);
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (emailRegExp.test(e.target.value)) {
      setError(false);
    } else {
      setError(true);
      setSendingError(false);
    }
  };

  const formPassError = (e) => {
    setInputPassValue(e.target.value);
    if (e.target.value !== "") {
      setError(false);
    } else {
      setError(true);
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
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={(e) => submit(e)}>
          <div className="input-wrapper">
            <label htmlFor="username">E-mail</label>
            <input
              ref={name}
              type="text"
              id="username"
              onChange={formNameError}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              ref={pass}
              type="password"
              id="password"
              onChange={formPassError}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" ref={remember} />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
          {error && (
            <p className="error">Invalid email format or empty password</p>
          )}
          {sendingError && <p className="error">Invalid email or password</p>}
        </form>
      </section>
    </main>
  );
}
export default SignIn;
