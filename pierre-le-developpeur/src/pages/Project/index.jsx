import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import "./project.css";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "../../components/Slider";
import LikeButton from "../../components/LikeButton";
import Collapse from "../../components/Collapse";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { getLikesThunk } from "../../thunkActionsCreator";
import TextArea from "../../components/TextArea";

function Project() {
  const navigate = useNavigate();
  const language = useSelector((state) => state.data.language);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);
  const projects = useSelector((state) => state.data.projects);
  let { title } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getLikes = async () => {
      const getLikesResult = await dispatch(getLikesThunk());
    };
    getLikes();
  }, []);
  const project = projects.find((project) => project.french_title === title);
  if (likes != null && skills != null && tools && projects && project != null) {
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
    return project != undefined ? (
      <div className="projectPage">
        <Header />
        <div className="slider">
          <Slider
            sliders={project.sliders}
            mini={false}
            likeId={project.slider_likes_id}
          ></Slider>
        </div>
        <div className="textAndLinks">
          <TextArea
            props={{
              french: project.french_description,
              english: project.english_description,
              likes: project.content_likes_id,
              links: project.links,
              edit: false,
              style: "windows",
            }}
          ></TextArea>
        </div>

        <div className="tools">
          <div className="collapse">
            <Collapse
              name={language === "FR" ? "Compétences" : "Skills"}
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
                  <LikeButton id={tool.likes_id}></LikeButton>
                </div>
              ))}
            ></Collapse>
          </div>
          <div className="collapse">
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
                  <LikeButton id={skill.likes_id}></LikeButton>
                </div>
              ))}
            ></Collapse>
          </div>
        </div>
      </div>
    ) : (
      setTimeout(() => {
        navigate("/HomeProject" + title);
      }, 500)
    );
  }
}
export default Project;
