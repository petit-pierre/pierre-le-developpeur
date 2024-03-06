import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import "./home.css";
import io from "socket.io-client";
import LikeButton from "../../components/LikeButton";
import Slider from "../../components/Slider";

function Home() {
  const language = useSelector((state) => state.data.language);
  const sliders = useSelector((state) => state.data.sliders);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);

  //const socket = useContext(SocketContext);
  const socket = io.connect("http://localhost:3000");

  //let likes = structuredClone(likess);
  const navigate = useNavigate();

  if (likes != null && skills != null && tools != null) {
    async function getOldLikes(response) {
      const get = await fetch("http://localhost:3000/api/likes", {
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
      <div>
        <Header></Header>

        <div className="withe">
          <div className="slider">
            <Slider sliders={sliders} mini={false}></Slider>
          </div>
          {language === "FR" ? (
            <p>{skills[0].french_title}</p>
          ) : (
            <p>{skills[0].english_title}</p>
          )}
          <div>
            <fieldset>
              likes CTA :<LikeButton id={likes[0]._id}></LikeButton>
              likes slider :<LikeButton id={likes[1]._id}></LikeButton>
            </fieldset>
            <fieldset>
              likes Tools :
              {tools.map((tool) => (
                <div key={tool._id}>
                  {tool.title} <LikeButton id={tool.likes_id}></LikeButton>
                </div>
              ))}
            </fieldset>
            <div className="footerPlace"></div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  } else {
    navigate("/");
  }
}

export default Home;
