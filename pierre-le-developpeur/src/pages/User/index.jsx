import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./user.css";
import {
  setProfilThunk,
  setProjectPictureThunk,
  setUsernameThunk,
} from "../../thunkActionsCreator";
import { userSlice } from "../../Slices/userSlice";
import Header from "../../components/Header";

function User() {
  const Category = [
    { id: 1, name: "React" },
    { id: 2, name: "wordpress" },
    { id: 3, name: "Logo/flyers" },
  ];
  const Tools = [
    { id: 1, name: "React" },
    { id: 2, name: "Redux" },
    { id: 3, name: "HTML 5" },
  ];

  const Skills = [
    { id: 1, name: "Ponctualité" },
    { id: 2, name: "Travail d'équipe" },
    { id: 3, name: "Créativité" },
  ];

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [edit, setEdit] = useState(false);
  const frenchProjectTitle = useRef();
  const englishProjectTitle = useRef();
  const date = useRef();
  const frenchDescription = useRef();
  const englishDescription = useRef();
  const linkTitle = useRef();
  const linkUrl = useRef();
  const linkPicture = useRef();
  const linkAlt = useRef();
  const sliderAlt = useRef();
  const frenchSliderContent = useRef();
  const englishSliderContent = useRef();
  const frenchResum = useRef();
  const englishResum = useRef();

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
    if (frenchProjectTitle.current.value !== "") {
      const projectTool = document.querySelectorAll(".Tools");
      const projectTools = [];
      for (let tool of projectTool) {
        if (tool.checked === true) {
          projectTools.push({ id: tool.id, name: tool.name });
        }
      }
      const projectSkill = document.querySelectorAll(".Skills");
      const projectSkills = [];
      for (let skill of projectSkill) {
        if (skill.checked === true) {
          projectSkills.push({ id: skill.id, name: skill.name });
        }
      }
      const projectCategories = document.querySelectorAll(".Categories");
      let category = "";
      for (let projectCategory of projectCategories) {
        if (projectCategory.checked === true) {
          category = projectCategory.value;
        }
      }

      const newProject = {
        title: {
          french: frenchProjectTitle.current.value,
          english: englishProjectTitle.current.value,
        },
        category: category,
        date: date.current.value,
        tools: projectTools,
        description: {
          french: frenchDescription.current.value,
          english: englishDescription.current.value,
        },
        links: [
          {
            title: linkTitle.current.value,
            url: linkUrl.current.value,
            picture: linkPicture.current.value,
            alt: linkAlt.current.value,
          },
        ],
        slider: [
          {
            picture: "",
            alt: sliderAlt.current.value,
            content: {
              french: frenchSliderContent.current.value,
              english: englishSliderContent.current.value,
            },
          },
        ],
        resum: {
          french: frenchResum.current.value,
          english: englishResum.current.value,
        },
        skills: projectSkills,
      };

      const sliderPicture = new FormData();
      let photo = document.querySelector(".picture");
      console.log(photo.value);
      sliderPicture.append("sliderPicture", photo.files[0]);
      console.log(sliderPicture);
      const setProjectPictureResult = dispatch(
        setProjectPictureThunk(sliderPicture, token)
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
                <p>date : </p>
                <input ref={date} type="date" />
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
                <p>resum in french : </p>
                <input ref={frenchResum} type="textarea" />
              </div>
              <div>
                <p>resum in english : </p>
                <input ref={englishResum} type="textarea" />
              </div>
              <fieldset>
                <legend>Links :</legend>
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
              </fieldset>
              <fieldset>
                <legend>Slider :</legend>
                <div>
                  <p>slider picture : </p>
                  <input type="file" className="picture" name="sliderPicture" />
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
              </fieldset>
              <div>
                <fieldset>
                  <legend>category :</legend>
                  {Category.map((categorie) => (
                    <div>
                      <input
                        className="Categories"
                        type="radio"
                        name="category"
                        id={categorie.id}
                        value={categorie.name}
                      />
                      <label for="React">{categorie.name}</label>
                    </div>
                  ))}
                </fieldset>
              </div>

              <div>
                <fieldset>
                  <legend>skills :</legend>
                  {Skills.map((skill) => (
                    <div>
                      <input
                        className="Skills"
                        type="checkbox"
                        name={skill.name}
                        id={skill.id}
                        value={skill.name}
                      />
                      <label for="React">{skill.name}</label>
                    </div>
                  ))}
                </fieldset>
              </div>

              <div>
                <fieldset>
                  <legend>tools :</legend>
                  {Tools.map((tool) => (
                    <div>
                      <input
                        className="Tools"
                        type="checkbox"
                        name={tool.name}
                        id={tool.id}
                        value={tool.name}
                      />
                      <label for="React">{tool.name}</label>
                    </div>
                  ))}
                </fieldset>
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
