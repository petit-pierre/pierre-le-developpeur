import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./user.css";
import { setProfilThunk, setUsernameThunk } from "../../thunkActionsCreator";
import { userSlice } from "../../Slices/userSlice";
import Header from "../../components/Header";

function User() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [edit, setEdit] = useState(false);
  const frenchProjectTitle = useRef();
  const englishProjectTitle = useRef();
  const category = useRef();
  const date = useRef();
  const projectTools = useRef();
  const frenchDescription = useRef();
  const englishDescription = useRef();
  const linkTitle = useRef();
  const linkUrl = useRef();
  const linkPicture = useRef();
  const linkAlt = useRef();
  const sliderPicture = useRef();
  const sliderAlt = useRef();
  const frenchSliderContent = useRef();
  const englishSliderContent = useRef();
  const frenchResum = useRef();
  const englishResum = useRef();
  const projectSkills = useRef();
  const signOut = () => {
    localStorage.clear();
    dispatch(userSlice.actions.setToken(null));
    dispatch(userSlice.actions.setUser(null));
    dispatch(userSlice.actions.setId(null));
    dispatch(userSlice.actions.setEmail(null));
    dispatch(userSlice.actions.setFirstName(null));
    dispatch(userSlice.actions.setLastName(null));
  };

  const setProfilResult = dispatch(setProfilThunk(token));

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function userChange() {
    setEdit(!edit);
  }

  function saveName(evt) {
    evt.preventDefault();
    const finalUserName = userName.current.value;
    if (userName.current.value !== "") {
      const setUsernameResult = dispatch(
        setUsernameThunk(finalUserName, token)
      );
      userChange();
    }
  }

  return (
    <main>
      <Header />
      <h1>Dashboard</h1>
      <div>
        {edit === true ? (
          <p></p>
        ) : (
          <div>
            <button className="edit-button" onClick={userChange}>
              Post new project
            </button>
          </div>
        )}

        {edit === true ? (
          <div>
            <form>
              <h1>Post new project</h1>
              <div>
                <p>title in french : </p>
                <input ref={frenchProjectTitle} type="text" />
              </div>
              <div>
                <p>title in english : </p>
                <input ref={englishProjectTitle} type="text" />
              </div>
              <div>
                <p>category : </p>
                <input ref={category} type="radio" />
              </div>
              <div>
                <p>date : </p>
                <input ref={date} type="date" />
              </div>
              <div>
                <p>tools : </p>
                <input ref={projectTools} type="checkbox" />
              </div>
              <div>
                <p>description in french : </p>
                <input ref={frenchDescription} type="textarea" />
              </div>
              <div>
                <p>description in english : </p>
                <input ref={englishDescription} type="textarea" />
              </div>
              <div>
                <p>link title : </p>
                <input ref={linkTitle} type="text" />
              </div>
              <div>
                <p>link url : </p>
                <input ref={linkUrl} type="text" />
              </div>
              <div>
                <p>link picture : </p>
                <input ref={linkPicture} type="file" />
              </div>
              <div>
                <p>link alt : </p>
                <input ref={linkAlt} type="text" />
              </div>
              <div>
                <button> add another link : </button>
              </div>
              <div>
                <p>slider picture : </p>
                <input ref={sliderPicture} type="file" />
              </div>
              <div>
                <p>slider alt : </p>
                <input ref={sliderAlt} type="text" />
              </div>
              <div>
                <p>slider content in french : </p>
                <input ref={frenchSliderContent} type="text" />
              </div>
              <div>
                <p>slider content in english : </p>
                <input ref={englishSliderContent} type="text" />
              </div>
              <div>
                <button> add another slide : </button>
              </div>
              <div>
                <p>resum in french : </p>
                <input ref={frenchResum} type="textarea" />
              </div>
              <div>
                <p>resum in english : </p>
                <input ref={englishResum} type="textarea" />
              </div>
              <div>
                <p>skills : </p>
                <input ref={projectSkills} type="checkbox" id="username" />
              </div>
              <button onClick={(evt) => saveName(evt)}>Save</button>
              <button onClick={userChange}>Cancel</button>
            </form>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </main>
  );
}

export default User;
