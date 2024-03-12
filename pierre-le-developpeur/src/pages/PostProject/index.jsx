import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLikeThunk,
  setProjectPictureThunk,
  setProjectThunk,
} from "../../thunkActionsCreator";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function PostProject() {
  let sliders = [];
  let links = [];
  let Sliders = [];

  const linkList = [
    { id: 1, name: "web" },
    { id: 2, name: "github" },
  ];

  const Category = [
    { id: 1, name: "Front-end" },
    { id: 2, name: "Design" },
    { id: 3, name: "Full stack" },
    { id: 3, name: "C.M.S" },
  ];
  const Skills = useSelector((state) => state.data.skills);
  const Tools = useSelector((state) => state.data.tools);
  let designTools = [];
  let frontTools = [];
  let backTools = [];
  for (let tool of Tools) {
    if (tool.categorie === "Design") {
      designTools.push({ title: tool.title, id: tool._id });
    }
  }
  for (let tool of Tools) {
    if (tool.categorie === "Front-end") {
      frontTools.push({ title: tool.title, id: tool._id });
    }
  }
  for (let tool of Tools) {
    if (tool.categorie === "Back-end") {
      backTools.push({ title: tool.title, id: tool._id });
    }
  }

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
  const token = useSelector((state) => state.data.token);
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
          projectTools.push({ id: tool.value, name: tool.name });
        }
      }
      const projectSkill = document.querySelectorAll(".Skills");
      const projectSkills = [];
      for (let skill of projectSkill) {
        if (skill.checked === true) {
          projectSkills.push({ id: skill.value, name: skill.name });
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
        french_title: frenchProjectTitle.current.value,
        english_title: englishProjectTitle.current.value,
        category: category,
        date: date.current.value,
        tools: projectTools,
        english_description: englishDescription.current.value,
        french_description: frenchDescription.current.value,
        french_resum: frenchResum.current.value,
        english_resum: englishResum.current.value,
        links: links,
        sliders: sliders,

        skills: projectSkills,
      };

      const likeSubmit = async () => {
        const likes = {
          title: newProject.french_title,
          likes: 0,
        };
        const setLikesResult = await dispatch(setLikeThunk(likes, token));
        newProject.likes_id = setLikesResult._id;
      };
      likeSubmit();
      const likeSliderSubmit = async () => {
        const likes = {
          title: "slider" + newProject.french_title,
          likes: 0,
        };
        const setLikesResult = await dispatch(setLikeThunk(likes, token));
        newProject.slider_likes_id = setLikesResult._id;
      };
      likeSliderSubmit();
      const likeContentSubmit = async () => {
        const likes = {
          title: "content" + newProject.french_title,
          likes: 0,
        };
        const setLikesResult = await dispatch(setLikeThunk(likes, token));
        newProject.content_likes_id = setLikesResult._id;
      };
      likeContentSubmit();

      for (let i = 0; i < sliders.length; i++) {
        const formData = new FormData();
        formData.append("imageUrl", "");
        formData.append("image", sliders[i].picture);

        const sliderSubmit = async () => {
          const setProjectPictureResult = await dispatch(
            setProjectPictureThunk(formData, token)
          );
          newProject.sliders[i].picture =
            await setProjectPictureResult.imageUrl;
          newProject.sliders[i].picture_id = await setProjectPictureResult._id;

          const finalSubmit = async () => {
            await setTimeout(() => {
              const setProjectResult = dispatch(
                setProjectThunk(newProject, token)
              );
            }, 500);
          };
          if (i === links.length - 1) {
            await finalSubmit();
          }
        };

        setTimeout(() => {
          sliderSubmit();
        }, 500);
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
        french_content: frenchSliderContent.current.value,
        english_content: englishSliderContent.current.value,
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
    } else {
      alert("champs incomplets");
    }
  }

  function cancelProject() {
    navigate("/User");
  }

  return (
    <div>
      <Header />
      <fieldset>
        <form>
          <h1>Post new project</h1>
          <div>
            <p>title in french : </p>
            <textarea ref={frenchProjectTitle} type="text" />
          </div>
          <div>
            <p>title in english : </p>
            <textarea ref={englishProjectTitle} type="text" />
          </div>
          <div>
            <p>date : </p>
            <input ref={date} type="date" />
          </div>

          <div>
            <p>description in french : </p>
            <textarea ref={frenchDescription} type="textarea" />
          </div>
          <div>
            <p>description in english : </p>
            <textarea ref={englishDescription} type="textarea" />
          </div>
          <div>
            <p>resum in french : </p>
            <textarea ref={frenchResum} type="textarea" />
          </div>
          <div>
            <p>resum in english : </p>
            <textarea ref={englishResum} type="textarea" />
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
                <label htmlFor="React">{link.name}</label>
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
              <input
                type="file"
                className="sliderPicture"
                name="sliderPicture"
                accept="image/png, image/jpeg,image/webp"
              />
            </div>
            <div>
              <p>slider alt : </p>
              <textarea ref={sliderAlt} type="text" />
            </div>
            <div>
              <p>slider content in french : </p>
              <textarea ref={frenchSliderContent} type="text" />
            </div>
            <div>
              <p>slider content in english : </p>
              <textarea ref={englishSliderContent} type="text" />
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
                  <label htmlFor="category">{categorie.name}</label>
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
                    name={skill.french_title}
                    id={skill._id}
                    value={skill._id}
                  />
                  <label htmlFor={skill.french_title}>
                    {skill.french_title}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend>Design tools :</legend>
              {designTools.map((tool) => (
                <div>
                  <input
                    className="Tools"
                    type="checkbox"
                    name={tool.title}
                    id={tool._id}
                    value={tool.id}
                  />
                  <label htmlFor={tool.title}>{tool.title}</label>
                </div>
              ))}
            </fieldset>
            <fieldset>
              <legend>Front-end tools :</legend>
              {frontTools.map((tool) => (
                <div>
                  <input
                    className="Tools"
                    type="checkbox"
                    name={tool.title}
                    id={tool._id}
                    value={tool.id}
                  />
                  <label htmlFor={tool.title}>{tool.title}</label>
                </div>
              ))}
            </fieldset>
            <fieldset>
              <legend>Back-end tools :</legend>
              {backTools.map((tool) => (
                <div>
                  <input
                    className="Tools"
                    type="checkbox"
                    name={tool.title}
                    id={tool._id}
                    value={tool.id}
                  />
                  <label htmlFor={tool.title}>{tool.title}</label>
                </div>
              ))}
            </fieldset>
          </div>
          <button onClick={(evt) => saveProject(evt)}>Save</button>
          <button onClick={(evt) => cancelProject(evt)}>Cancel</button>
        </form>
      </fieldset>
    </div>
  );
}

export default PostProject;
