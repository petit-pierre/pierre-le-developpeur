import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import "./home.css";
import io from "socket.io-client";
import LikeButton from "../../components/LikeButton";
import Slider from "../../components/Slider";
import Contact from "../../components/Contact";
import { useEffect, useRef } from "react";

function Home() {
  const language = useSelector((state) => state.data.language);
  const sliders = useSelector((state) => state.data.sliders);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);

  const location = useLocation();
  const lastHash = useRef("");

  // listen to location change using useEffect with location as dependency
  // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        lastHash.current = "";
      }, 100);
    }
  }, [location]);

  //const socket = useContext(SocketContext);
  //const socket = io.connect("http://localhost:3000");
  const socket = io.connect("http://api.petitpierre.net");

  //let likes = structuredClone(likess);
  const navigate = useNavigate();

  if (likes != null && skills != null && tools != null) {
    async function getOldLikes(response) {
      const get = await fetch("http://api.petitpierre.net/api/likes", {
        method: "GET",
      });
      const newlikes = await get.json();
      const found = newlikes.find((like) => like._id === response.message);

      document.getElementById(response.message).innerText = Intl.NumberFormat(
        "en-US",
        {
          notation: "compact",
          maximumFractionDigits: 2,
        }
      ).format(found.likes);
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
          <div className="slider">
            <Slider
              sliders={sliders}
              mini={false}
              likeId={likes[1]._id}
            ></Slider>
          </div>
          <div className="contact" id="contact">
            <Contact likeId={likes[0]._id}></Contact>
          </div>
          <div id="competences">
            <div>
              <fieldset>
                likes Tools :
                {tools.map((tool) => (
                  <div key={tool._id}>
                    {tool.title} <LikeButton id={tool.likes_id}></LikeButton>
                  </div>
                ))}
              </fieldset>
            </div>
            <div id="projets"></div>

            <div className="footerPlace"></div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  } else {
    setTimeout(() => {
      navigate("/Home");
    }, 500);
  }
}

export default Home;
