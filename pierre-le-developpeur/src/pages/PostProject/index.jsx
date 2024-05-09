import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePictureThunk,
  putProjectThunk,
  setLikeThunk,
  setProjectPictureThunk,
  setProjectThunk,
} from "../../thunkActionsCreator";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./postProject.css";

function PostProject() {
  //let sliders = [];
  //let links = [];
  const [sliders, setSliders] = useState([]);
  const [links, setLinks] = useState([]);
  const [truc, setTruc] = useState(0);
  //let slideToDellette = [];
  const [slideToDellette, setSlideToDellette] = useState([]);
  //let Sliders = [];

  /*useEffect(() => {
    console.log("coucou");
  }, [links]);*/

  let { projectId } = useParams();
  //console.log(projectId);
  const projects = useSelector((state) => state.data.projects);
  let project = "newOne";
  if (projectId !== "newOne") {
    project = projects.find((projects) => projects._id === projectId);
  }

  //console.log(project);
  useEffect(() => {
    if (projectId !== "newOne") {
      setLinks(links.concat(project.links));
      setSliders(sliders.concat(project.sliders));
    }
  }, []);

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
        if (newProject.sliders[i].newPicture === true) {
          formData.append("imageUrl", "");
          formData.append("image", sliders[i].picture);
        } //else{}

        const sliderSubmit = async () => {
          if (newProject.sliders[i].newPicture === true) {
            const setProjectPictureResult = await dispatch(
              setProjectPictureThunk(formData, token)
            );
            newProject.sliders[i].picture =
              await setProjectPictureResult.imageUrl;
            newProject.sliders[i].picture_id =
              await setProjectPictureResult._id;
            delete newProject.sliders[i].temporaryUrl;
            delete newProject.sliders[i].newPicture;
          }
          const finalSubmit = async () => {
            await setTimeout(() => {
              if (project === "newOne") {
                const setProjectResult = dispatch(
                  setProjectThunk(newProject, token)
                );
              } else {
                const id = projectId;
                const putProjectResult = dispatch(
                  putProjectThunk(newProject, token, id)
                );
              }
            }, 500);
          };
          if (i === links.length - 1) {
            for (let picToD of slideToDellette) {
              const id = picToD;
              const deletePicture = async () => {
                const deletePictureResult = await dispatch(
                  deletePictureThunk(id, token)
                );
              };
              deletePicture();
            }

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
  function RemoveSlide(evt, projectSlide) {
    evt.preventDefault();
    if (projectSlide.newPicture === true) {
      slideToDellette.push(projectSlide.picture_id);
      setSlideToDellette(slideToDellette);
    }

    const found = sliders.find((sli) => sli === projectSlide);
    const index = sliders.findIndex((slideIndex) => slideIndex === found);
    sliders.splice(index, 1);
    setSliders(sliders);
    //console.log(links);
    set(evt);
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
        temporaryUrl: URL.createObjectURL(photo.files[0]),
        newPicture: true,
        alt: sliderAlt.current.value,
        french_content: frenchSliderContent.current.value,
        english_content: englishSliderContent.current.value,
      };

      sliders.push(slider);
      setSliders(sliders);
      console.log(sliders);
      alert("slide ajouté : " + photo.files[0].name);
      set(evt);
      //const objectURL = URL.createObjectURL(photo.files[0])
      //delete slider.temporaryUrl;
      console.log(sliders);
      sliderAlt.current.value = "";
      frenchSliderContent.current.value = "";
      englishSliderContent.current.value = "";
      photo.value = "";
    } else {
      alert("champs incomplets");
    }
  }
  function set(evt) {
    evt.preventDefault();
    setTruc(truc + 1);
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
      setLinks(links);
      //console.log(links);
      //alert("lien ajouté : " + linkContent.url);

      linkUrl.current.value = "";
      //return links.map((li) => <p>{li.url}</p>);
      //<p>coucou</p>;
    } else {
      alert("champs incomplets");
    }
    set(evt);
  }

  function ProjectLinksDellete(evt, prlink) {
    evt.preventDefault();
    const found = links.find((li) => li === prlink);
    const index = links.findIndex((la) => la === found);
    links.splice(index, 1);
    setLinks(links);
    //console.log(links);
    set(evt);
  }

  function cancelProject() {
    navigate("/User");
  }

  if (project === undefined) {
    project = null;
  }

  return (
    <div className="postProject">
      <fieldset>
        <form>
          <h1>Post new project</h1>
          <div>
            <p>title in french : </p>
            <textarea
              ref={frenchProjectTitle}
              type="text"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.french_title
              }
            />
          </div>
          <div>
            <p>title in english : </p>
            <textarea
              ref={englishProjectTitle}
              type="text"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.english_title
              }
            />
          </div>
          <div>
            <p>date : </p>
            <input
              ref={date}
              type="date"
              //onfocus={(date.type = "date")}
              //onblur="(this.type='text')"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.date
              }
            />
          </div>

          <div>
            <p>description in french : </p>
            <textarea
              ref={frenchDescription}
              type="textarea"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.french_description
              }
            />
          </div>
          <div>
            <p>description in english : </p>
            <textarea
              ref={englishDescription}
              type="textarea"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.english_description
              }
            />
          </div>
          <div>
            <p>resum in french : </p>
            <textarea
              ref={frenchResum}
              type="textarea"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.french_resum
              }
            />
          </div>
          <div>
            <p>resum in english : </p>
            <textarea
              ref={englishResum}
              type="textarea"
              defaultValue={
                project === null ||
                project === undefined ||
                project === "newOne"
                  ? null
                  : project.english_resum
              }
            />
          </div>
          <fieldset>
            <legend>Links :</legend>
            {links.map((prlink) => (
              <fieldset>
                <p>link url : {prlink.url}</p>

                <p>category : {prlink.category}</p>
                <button onClick={(evt) => ProjectLinksDellete(evt, prlink)}>
                  remove this link :
                </button>
              </fieldset>
            ))}

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
                <label htmlFor="Link">{link.name}</label>
              </div>
            ))}
            <button onClick={(evt) => ProjectLinksUpdate(evt)}>
              add this link :
            </button>
          </fieldset>
          <fieldset className="sliderField">
            <legend>Slider :</legend>
            {sliders.map((projectSlide) => (
              <fieldset className="sliderContainer">
                <img
                  src={
                    projectSlide.newPicture === true
                      ? projectSlide.temporaryUrl
                      : projectSlide.picture
                  }
                  alt={projectSlide.alt}
                  className="sliderPictureShow"
                ></img>
                <p>{projectSlide.french_content} </p>
                <p>{projectSlide.english_content} </p>
                <button onClick={(evt) => RemoveSlide(evt, projectSlide)}>
                  remove this slide :
                </button>
              </fieldset>
            ))}
            <div className="sliderAdd">
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
              <button onClick={(evt) => ProjectSliderUpdate(evt)}>
                {" "}
                add this slide :{" "}
              </button>
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
                    defaultChecked={
                      project === null ||
                      project === undefined ||
                      project === "newOne"
                        ? null
                        : categorie.name === project.category
                        ? "true"
                        : null
                    }
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
                  {project === null ||
                  project.skills === null ||
                  project === undefined ||
                  project === "newOne" ? (
                    <input
                      className="Skills"
                      type="checkbox"
                      name={skill.french_title}
                      id={skill._id}
                      value={skill._id}
                    />
                  ) : project.skills.find(
                      (sk) => sk.name === skill.french_title
                    ) !== undefined ? (
                    <input
                      className="Skills"
                      type="checkbox"
                      name={skill.french_title}
                      id={skill._id}
                      value={skill._id}
                      defaultChecked
                    />
                  ) : (
                    <input
                      className="Skills"
                      type="checkbox"
                      name={skill.french_title}
                      id={skill._id}
                      value={skill._id}
                    />
                  )}

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
                  {project === null ||
                  project.tools === null ||
                  project === undefined ||
                  project === "newOne" ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  ) : project.tools.find((prt) => prt.name === tool.title) !==
                    undefined ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                      defaultChecked
                    />
                  ) : (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  )}

                  <label htmlFor={tool.title}>{tool.title}</label>
                </div>
              ))}
            </fieldset>
            <fieldset>
              <legend>Front-end tools :</legend>
              {frontTools.map((tool) => (
                <div>
                  {project === null ||
                  project.tools === null ||
                  project === undefined ||
                  project === "newOne" ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  ) : project.tools.find((prt) => prt.name === tool.title) !==
                    undefined ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                      defaultChecked
                    />
                  ) : (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  )}

                  <label htmlFor={tool.title}>{tool.title}</label>
                </div>
              ))}
            </fieldset>
            <fieldset>
              <legend>Back-end tools :</legend>
              {backTools.map((tool) => (
                <div>
                  {project === null ||
                  project.tools === null ||
                  project === undefined ||
                  project === "newOne" ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  ) : project.tools.find((prt) => prt.name === tool.title) !==
                    undefined ? (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                      defaultChecked
                    />
                  ) : (
                    <input
                      className="Tools"
                      type="checkbox"
                      name={tool.title}
                      id={tool._id}
                      value={tool.id}
                    />
                  )}
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
