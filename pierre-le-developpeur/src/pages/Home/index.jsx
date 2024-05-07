import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./home.css";
import io from "socket.io-client";
import LikeButton from "../../components/LikeButton";
import Contact from "../../components/Contact";
import { useEffect } from "react";
import Collapse from "../../components/Collapse";
import Cards from "../../components/Cards";
import { getLikesThunk } from "../../thunkActionsCreator";
import TextArea from "../../components/TextArea";
import Accueil from "../../components/Accueil";
import Snow from "../../components/Snow";

function Home() {
  const language = useSelector((state) => state.data.language);
  //const sliders = useSelector((state) => state.data.sliders);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);
  const translations = useSelector((state) => state.data.translations);
  const projects = useSelector((state) => state.data.projects);

  const socket = io.connect("http://api.petitpierre.net");

  const dispatch = useDispatch();

  useEffect(() => {
    const getLikes = async () => {
      const getLikesResult = await dispatch(getLikesThunk());
    };
    getLikes();
  }, []);

  /*let loaded = false;

  window.addEventListener("load", () => {
    console.log("Chargé !!");
    loaded = true;
  });*/

  //const socket = io.connect("http://localhost:3000");

  //let likes = structuredClone(likess);
  const navigate = useNavigate();

  if (
    likes != null &&
    skills != null &&
    tools &&
    translations &&
    projects != null
  ) {
    async function getOldLikes(response) {
      const get = await fetch("http://api.petitpierre.net/api/likes", {
        method: "GET",
      });
      const newlikes = await get.json();
      const found = newlikes.find((like) => like._id === response.message);

      if (document.getElementById(response.message) != null) {
        document.getElementById(response.message).innerText = Intl.NumberFormat(
          "en-US",
          {
            notation: "compact",
            maximumFractionDigits: 2,
          }
        ).format(found.likes);
      }
    }

    socket.on("receive_message", (response) => {
      setTimeout(() => {
        getOldLikes(response);
      }, 150);
    });
    const Lscreen = window.innerWidth;

    return (
      <div className="withe">
        {Lscreen > 650 ? <Snow></Snow> : ""}

        <span id="accueil"></span>
        <Accueil></Accueil>
        <div className="accueil">
          <div className="reco">
            <div className="recoTxt">
              <TextArea
                props={{
                  french: translations.french.recommendation,
                  english: translations.english.recommendation,
                  likes: null,
                  links: null,
                  edit: false,
                  style: "empty",
                  id: "home02",
                  sign: true,
                }}
              ></TextArea>
            </div>
            <div className="like">
              <LikeButton
                propsLike={{ id: likes[4]._id, color: "black" }}
                className="like"
              ></LikeButton>
            </div>
          </div>

          <span id="contact"></span>
          <div className="contact">
            <Contact
              props={{ likeId: likes[0]._id, recoId: likes[4]._id }}
            ></Contact>
          </div>
          <span id="competences"></span>
          <div className="competences">
            <div className="contentSkills">
              <TextArea
                props={{
                  french: translations.french.placeholder_content,
                  english: translations.english.placeholder_content,
                  likes: null,
                  links: null,
                  edit: false,
                  style: "purpleAndWitheTextarea",
                  title: "Competences",
                  id: "home03",
                }}
                content={skills.map((skill) => (
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
                          : skill.english_title}
                      </p>
                    </div>
                  </div>
                ))}
              ></TextArea>
            </div>
            <div className="pictureJap">
              <img
                src="http://pierre-le-developpeur.com/assets/background.png"
                className="background"
                alt="cerisier du japon (background)"
              ></img>
            </div>

            <div className="tools">
              <div className="collapse">
                <Collapse
                  name={"Design/Mao"}
                  content={tools.map((tool) =>
                    tool.categorie === "Design" ? (
                      <div key={tool._id} className="collapseContent">
                        <div className="logoAndTitle">
                          <img
                            src={tool.picture_url}
                            alt="logo"
                            className="logo"
                          ></img>
                          <p className="toolTitle">{tool.title} </p>
                        </div>
                        <div className="like">
                          <LikeButton
                            propsLike={{
                              id: tool.likes_id,
                              color: "black",
                            }}
                          ></LikeButton>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                ></Collapse>
              </div>
              <div className="collapse">
                <Collapse
                  name={"Front-end"}
                  content={tools.map((tool) =>
                    tool.categorie === "Front-end" ? (
                      <div key={tool._id} className="collapseContent">
                        <div className="logoAndTitle">
                          <img
                            src={tool.picture_url}
                            alt="logo"
                            className="logo"
                          ></img>
                          <p className="toolTitle">{tool.title}</p>
                        </div>
                        <div className="like">
                          <LikeButton
                            propsLike={{ id: tool.likes_id, color: "black" }}
                          ></LikeButton>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                ></Collapse>
              </div>
              <div className="collapse">
                <Collapse
                  name={"Back-end"}
                  content={tools.map((tool) =>
                    tool.categorie === "Back-end" ? (
                      <div key={tool._id} className="collapseContent">
                        <div className="logoAndTitle">
                          <img
                            src={tool.picture_url}
                            alt="logo"
                            className="logo"
                          ></img>
                          <p className="toolTitle">{tool.title}</p>
                        </div>
                        <div className="like">
                          <LikeButton
                            propsLike={{ id: tool.likes_id, color: "black" }}
                          ></LikeButton>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                ></Collapse>
              </div>
            </div>
          </div>
          <span id="projets"></span>
          <div className="projets">
            {projects.map((project) => (
              <Cards project={project} key={project._id}></Cards>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }
}

export default Home;
