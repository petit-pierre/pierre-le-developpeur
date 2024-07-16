import { useDispatch, useSelector } from "react-redux";
import "./project.css";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "../../components/Slider";
import LikeButton from "../../components/LikeButton";
import Collapse from "../../components/Collapse";
import { useEffect, useState } from "react";
import { getLikesThunk } from "../../thunkActionsCreator";
import TextArea from "../../components/TextArea";
import Contact from "../../components/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

function Project() {
  const navigate = useNavigate();
  const language = useSelector((state) => state.data.language);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);
  const projects = useSelector((state) => state.data.projects);
  const translations = useSelector((state) => state.data.translations);
  let { title } = useParams();
  const dispatch = useDispatch();
  let divCounter = true;

  useEffect(() => {
    AOS.init();
  }, []);

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    console.log(scrollTop);
    if (
      document.querySelector(".arrowRight") !== null &&
      document.querySelector(".arrowLeft") !== null
    ) {
      if (scrollTop > 100) {
        document.querySelector(".arrowRight").classList.add("blinded");
        document.querySelector(".arrowLeft").classList.add("blinded");
      } else {
        document.querySelector(".arrowRight").classList.remove("blinded");
        document.querySelector(".arrowLeft").classList.remove("blinded");
      }
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  useEffect(() => {
    const getLikes = async () => {
      const getLikesResult = await dispatch(getLikesThunk());
    };
    getLikes();
  }, []);

  const project = projects.find((project) => project.french_title === title);

  if (
    likes != null &&
    skills != null &&
    tools &&
    projects &&
    project &&
    translations != null
  ) {
    let sortedSlider = [];
    let sliders = project.sliders;
    for (let slide of sliders) {
      //console.log(slide);
      if (slide.alt !== "Video" && slide.alt !== "TextPicture") {
        sortedSlider.push(slide);
      }
    }
    const tadaTools = [];
    for (let oneOfTools of tools) {
      for (let projectTool of project.tools) {
        if (projectTool.id.includes(oneOfTools._id)) {
          tadaTools.push(oneOfTools);
        }
      }
    }

    const tadaSkills = [];
    for (let oneOfSkills of skills) {
      for (let projectSkill of project.skills) {
        if (projectSkill.id.includes(oneOfSkills._id)) {
          tadaSkills.push(oneOfSkills);
        }
      }
    }
    return project !== undefined ? (
      <div className="projectPage">
        <span id="project"></span>

        <div
          className="slider"
          style={{
            /*"box-shadow":
              "rgba(240, 46, 170, 0.4) 0px " +
              (500 - scrollTop) +
              "px, rgba(240, 46, 170, 0.3) 0px " +
              (525 - scrollTop) +
              "px, rgba(240, 46, 170, 0.2) 0px " +
              (550 - scrollTop) +
              "px, rgba(240, 46, 170, 0.1) 0px " +
              (575 - scrollTop) +
              "px, rgba(240, 46, 170, 0.05) 0px " +
              (600 - scrollTop) +
              "px",
              "0px " +
              (150 - scrollTop) +
              "px " +
              (300 - scrollTop) +
              "px black"*/
            opacity: 1 - scrollTop / 350,
          }}
        >
          <div
            className="transition"
            style={{
              //opacity: 1,
              //opacity: scrollTop ,
              bottom: "0",
              //height: scrollTop / 10 + "px",
              height: scrollTop * 4,
              //height: "calc (10dvh +" + scrollTop / 150 + "dvh)",
            }}
          ></div>

          <Slider
            sliders={sortedSlider}
            mini={false}
            likeId={project.slider_likes_id}
          ></Slider>
        </div>
        <div
          className="textAndLinks"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <TextArea
            props={{
              french: project.french_description,
              english: project.english_description,
              likes: project.content_likes_id,
              links: project.links,
              edit: false,
              style: "windows",
              cofee: true,
              id: "project00",
            }}
          ></TextArea>
        </div>
        <div className="description">
          {project.sliders.map((slide) =>
            slide.alt === "TextPicture" ? (
              <div
                key={slide._id}
                className={
                  divCounter === true
                    ? "descriptionUnit left"
                    : "descriptionUnit right"
                }
              >
                <div className="pics">
                  <img
                    src={slide.picture}
                    alt="illustration projet"
                    data-aos="flip-left"
                    data-aos-duration="1000"
                  ></img>
                </div>
                <div
                  className="text"
                  data-aos={divCounter === true ? "fade-left" : "fade-right"}
                >
                  <TextArea
                    props={{
                      french: slide.french_content,
                      english: slide.english_content,
                      edit: false,
                      style: "empty",
                      cofee: false,
                      id: "project" + slide._id,
                    }}
                  >
                    {" "}
                  </TextArea>{" "}
                  {(divCounter = !divCounter)}
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <div className="tools">
          <div className="collapse" data-aos="fade-right">
            <Collapse
              name={language === "FR" ? "Competences" : "Skills"}
              content={tadaTools.map((tool) => (
                <div key={tool._id} className="collapseContent">
                  <div className="logoAndTitle">
                    <img
                      src={tool.picture_url}
                      alt="logo"
                      className="logo"
                    ></img>
                    <p className="toolTitle">{tool.title} </p>
                  </div>
                  <LikeButton
                    propsLike={{ id: tool.likes_id, color: "black" }}
                  ></LikeButton>
                </div>
              ))}
            ></Collapse>
          </div>

          <div className="collapse" data-aos="fade-left">
            <Collapse
              name="Soft skills"
              content={tadaSkills.map((skill) => (
                <div key={skill._id} className="collapseContent">
                  <div className="logoAndTitle">
                    <img
                      src={skill.picture_url}
                      alt="logo"
                      className="logo"
                    ></img>
                    <p className="toolTitle">
                      {language === "FR"
                        ? skill.french_title
                        : skill.english_title}{" "}
                    </p>
                  </div>
                  <LikeButton
                    propsLike={{ id: skill.likes_id, color: "black" }}
                  ></LikeButton>
                </div>
              ))}
            ></Collapse>
          </div>
        </div>
        <div className="videoField" data-aos="zoom-in" data-aos-duration="2000">
          {project.sliders.map((slide) =>
            slide.alt === "Video" ? (
              <div>
                {language === "FR" ? (
                  <p>{slide.french_content} </p>
                ) : (
                  <p>{slide.english_content} </p>
                )}

                <iframe
                  className="video"
                  //min-width="560"
                  //height="315"
                  height={window.innerWidth * 0.45}
                  src={slide.picture.concat("?rel=0")}
                  title="YouTube video player"
                  frameborder="0"
                  allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <Contact props={{ likeId: "65dc9d6a700bae9e300a79aa" }} />
      </div>
    ) : (
      setTimeout(() => {
        navigate("/HomeProject" + title);
      }, 500)
    );
  }
}
export default Project;
