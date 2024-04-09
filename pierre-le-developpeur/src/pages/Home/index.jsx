import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import "./home.css";
import io from "socket.io-client";
import LikeButton from "../../components/LikeButton";
import Slider from "../../components/Slider";
import Contact from "../../components/Contact";
import { useEffect } from "react";
import Collapse from "../../components/Collapse";
import Cards from "../../components/Cards";
import { getLikesThunk } from "../../thunkActionsCreator";
import TextArea from "../../components/TextArea";

function Home() {
  const language = useSelector((state) => state.data.language);
  const sliders = useSelector((state) => state.data.sliders);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);
  const translations = useSelector((state) => state.data.translations);
  const projects = useSelector((state) => state.data.projects);

  const socket = io.connect("http://api.petitpierre.net");

  const dispatch = useDispatch();

  const intro =
    "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour /n comme Aldus PageMaker.";

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

    return (
      <div id="accueil">
        <Header></Header>

        <div className="withe">
          <div className="intro">
            <TextArea
              props={{
                french: intro,
                english: intro,
                likes: null,
                links: null,
                edit: false,
                style: "empty",
              }}
            ></TextArea>
          </div>

          <div className="contact">
            <span id="contact"></span>
            <Contact
              props={{ likeId: likes[0]._id, recoId: likes[4]._id }}
            ></Contact>
          </div>
          <div className="competences">
            <span id="competences"></span>
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
                          <LikeButton id={tool.likes_id}></LikeButton>
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
                          <LikeButton id={tool.likes_id}></LikeButton>
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
                          <LikeButton id={tool.likes_id}></LikeButton>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                ></Collapse>
              </div>
            </div>
            <div className="collapse skills">
              <Collapse
                name={"Soft skills"}
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
                    <div className="like">
                      <LikeButton id={skill.likes_id}></LikeButton>
                    </div>
                  </div>
                ))}
              ></Collapse>
            </div>
            <div></div>
            <div className="projets">
              <span id="projets"></span>
              {projects.map((project) => (
                <Cards project={project} key={project._id}></Cards>
              ))}
            </div>

            <div className="footerPlace"></div>
          </div>
        </div>
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/Home");
    }, 500);
  }
}

export default Home;
