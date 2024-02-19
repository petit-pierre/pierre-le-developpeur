import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./user.css";
import {
  setProfilThunk,
  setProjectPictureThunk,
  setProjectThunk,
  setUsernameThunk,
} from "../../thunkActionsCreator";
import { userSlice } from "../../Slices/userSlice";
import Header from "../../components/Header";
import ProjectSliderInfo from "../../components/ProjectSliderInfo";

function User() {
  let sliders = [];
  let links = [];

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
  const linkAlt = useRef();
  const sliderAlt = useRef();
  const frenchSliderContent = useRef();
  const englishSliderContent = useRef();
  const frenchResum = useRef();
  const englishResum = useRef();

  const signOut = () => {
    localStorage.clear();
    dispatch(userSlice.actions.setToken(null));
  };

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function projectChange() {
    setEdit(!edit);
  }

  function saveProject(evt) {
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
        links: links,
        sliders: sliders,
        resum: {
          french: frenchResum.current.value,
          english: englishResum.current.value,
        },
        skills: projectSkills,
      };
      for (let i = 0; i < sliders.length; i++) {
        const formData = new FormData();
        formData.append("imageUrl", "");
        formData.append("image", sliders[i].picture);

        const sliderSubmit = async () => {
          const setProjectPictureResult = await dispatch(
            setProjectPictureThunk(formData, token)
          );
          newProject.sliders[i].picture = setProjectPictureResult.imageUrl;
        };

        sliderSubmit();
      }
      for (let i = 0; i < links.length; i++) {
        const formData = new FormData();
        formData.append("imageUrl", "");
        formData.append("image", links[i].picture);

        const linkSubmit = async () => {
          const setProjectPictureResult = await dispatch(
            setProjectPictureThunk(formData, token)
          );
          newProject.links[i].picture = setProjectPictureResult.imageUrl;
          const finalSubmit = async () => {
            const setProjectResult = await dispatch(
              setProjectThunk(newProject, token)
            );
            console.log(setProjectResult);
          };
          await finalSubmit();
        };

        linkSubmit();
      }

      projectChange();
    }
  }
  function ProjectSliderUpdate(evt) {
    evt.preventDefault();
    let photo = document.querySelector(".sliderPicture");
    if (
      photo.files[0] &&
      frenchSliderContent.current.value &&
      englishSliderContent.current.value &&
      sliderAlt.current.value != ""
    ) {
      let slider = {
        picture: photo.files[0],
        alt: sliderAlt.current.value,
        content: {
          french: frenchSliderContent.current.value,
          english: englishSliderContent.current.value,
        },
      };

      sliders.push(slider);
      alert("slide ajouté : " + photo.files[0].name);

      sliderAlt.current.value = "";
      frenchSliderContent.current.value = "";
      englishSliderContent.current.value = "";
      photo.value = "";
    } else {
      alert("champs incomplets");
    }
  }
  function ProjectLinksUpdate(evt) {
    evt.preventDefault();
    let photo = document.querySelector(".linkPicture");
    if (
      photo.files[0] &&
      linkTitle.current.value &&
      linkUrl.current.value &&
      linkAlt.current.value !== ""
    ) {
      let link = {
        title: linkTitle.current.value,
        url: linkUrl.current.value,
        picture: photo.files[0],
        alt: linkAlt.current.value,
      };

      links.push(link);
      alert("slide ajouté : " + photo.files[0].name);

      linkAlt.current.value = "";
      linkTitle.current.value = "";
      englishSliderContent.current.value = "";
      linkUrl.current.value = "";
      photo.value = "";
    } else {
      alert("champs incomplets");
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
            <button className="edit-button" onClick={projectChange}>
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
                  <input
                    className="linkPicture"
                    name="linkPicture"
                    type="file"
                  />
                </div>
                <div>
                  <p>link alt : </p>
                  <input ref={linkAlt} type="text" />
                </div>
                <div></div>
              </fieldset>
              <button onClick={(evt) => ProjectLinksUpdate(evt)}>
                {" "}
                add this link :{" "}
              </button>
              <fieldset>
                <legend>Slider :</legend>
                <div>
                  <p>slider picture : </p>
                  <input
                    type="file"
                    className="sliderPicture"
                    name="sliderPicture"
                  />
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
              </fieldset>
              <div>
                <button onClick={(evt) => ProjectSliderUpdate(evt)}>
                  {" "}
                  add this slide :{" "}
                </button>
              </div>
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
              <button onClick={(evt) => saveProject(evt)}>Save</button>
              <button onClick={projectChange}>Cancel</button>
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
