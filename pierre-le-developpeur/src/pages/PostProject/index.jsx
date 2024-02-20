import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectsThunk,
  setProjectPictureThunk,
  setProjectThunk,
  setProjectTranslationThunk,
} from "../../thunkActionsCreator";
import { userSlice } from "../../Slices/userSlice";
import { Navigate, useNavigate } from "react-router-dom";

function PostProject() {
  let sliders = [];
  let links = [];
  let frenchSliders = [];
  let englishSliders = [];

  const linkList = [
    { id: 1, name: "web" },
    { id: 2, name: "github" },
  ];

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

  const frenchProjectTitle = useRef();
  const englishProjectTitle = useRef();
  const date = useRef();
  const frenchDescription = useRef();
  const englishDescription = useRef();
  const linkUrl = useRef();
  const sliderAlt = useRef();
  const frenchSliderContent = useRef();
  const englishSliderContent = useRef();
  const frenchResum = useRef();
  const englishResum = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
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

      const projectTranslation = {
        englishProject: [
          {
            title: englishProjectTitle.current.value,
            description: englishDescription.current.value,
            resum: englishResum.current.value,
            slider: englishSliders,
          },
        ],

        frenchProject: [
          {
            title: frenchProjectTitle.current.value,
            description: frenchDescription.current.value,
            resum: frenchResum.current.value,
            slider: frenchSliders,
          },
        ],
      };

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
      console.log(projectTranslation);
      const projectTranslationSubmit = async () => {
        const setProjectTranslationResult = await dispatch(
          setProjectTranslationThunk(projectTranslation, token)
        );
        console.log(setProjectTranslationResult);
      };

      projectTranslationSubmit();

      for (let i = 0; i < sliders.length; i++) {
        const formData = new FormData();
        formData.append("imageUrl", "");
        formData.append("image", sliders[i].picture);

        const sliderSubmit = async () => {
          const setProjectPictureResult = await dispatch(
            setProjectPictureThunk(formData, token)
          );
          newProject.sliders[i].picture = setProjectPictureResult.imageUrl;
          newProject.sliders[i].picture_id = setProjectPictureResult._id;

          const finalSubmit = async () => {
            await setTimeout(() => {
              const setProjectResult = dispatch(
                setProjectThunk(newProject, token)
              );
              console.log(setProjectResult);
            }, 500);
          };
          if (i === links.length - 1) {
            await finalSubmit();
          }
        };

        sliderSubmit();
        navigate("/User");
      }
    }
  }
  function ProjectSliderUpdate(evt) {
    evt.preventDefault();
    let photo = document.querySelector(".sliderPicture");
    if (
      photo.files[0] &&
      frenchSliderContent.current.value &&
      englishSliderContent.current.value &&
      sliderAlt.current.value !== ""
    ) {
      let slider = {
        picture: photo.files[0],
        alt: sliderAlt.current.value,
        content: {
          french: frenchSliderContent.current.value,
          english: englishSliderContent.current.value,
        },
      };

      let frenchSlider = { content: frenchSliderContent.current.value };
      let englishSlider = { content: englishSliderContent.current.value };
      frenchSliders.push(frenchSlider);
      englishSliders.push(englishSlider);
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
    const projectLinks = document.querySelectorAll(".Link");
    let linkCategory = "";
    for (let projectLink of projectLinks) {
      if (projectLink.checked === true) {
        linkCategory = projectLink.value;
      }
    }
    if (linkUrl.current.value && linkCategory !== "") {
      let linkContent = {
        url: linkUrl.current.value,
        category: linkCategory,
      };

      links.push(linkContent);
      alert("lien ajouté : " + linkContent.url);

      linkUrl.current.value = "";
      console.log(links);
    } else {
      alert("champs incomplets");
    }
  }

  function cancelProject() {
    navigate("/User");
  }

  return (
    <fieldset>
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
            <p>link url : </p>
            <input ref={linkUrl} type="text" />
          </div>
          <legend>category :</legend>
          {linkList.map((link) => (
            <div>
              <input
                className="Link"
                type="radio"
                name="Link"
                id={link.id}
                value={link.name}
              />
              <label for="React">{link.name}</label>
            </div>
          ))}
        </fieldset>
        <button onClick={(evt) => ProjectLinksUpdate(evt)}>
          {" "}
          add this link :{" "}
        </button>
        <fieldset>
          <legend>Slider :</legend>
          <div>
            <p>slider picture : </p>
            <input type="file" className="sliderPicture" name="sliderPicture" />
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
        <button onClick={(evt) => cancelProject(evt)}>Cancel</button>
      </form>
    </fieldset>
  );
}

export default PostProject;