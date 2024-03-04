import { useState } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Footer from "../../components/Footer";
import "./home.css";
import { userSlice } from "../../Slices/userSlice";

function Home() {
  const socket = io.connect("http://localhost:3000");
  const language = useSelector((state) => state.data.language);
  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  const tools = useSelector((state) => state.data.tools);
  const thanks = useSelector((state) => state.data.thanks);
  const dispatch = useDispatch();
  //let likes = structuredClone(likess);
  const navigate = useNavigate();

  async function getOldLikes(response) {
    const get = await fetch("http://localhost:3000/api/likes", {
      method: "GET",
    });
    const newlikes = await get.json();
    const found = newlikes.find((like) => like._id === response.message);
    const newValue = found.likes + 1;
    const like = {
      likes: newValue,
    };
    document.getElementById(response.message).innerText = found.likes;
    const id = response.message;
    async function putOldLikes(id, like) {
      const put = await fetch("http://localhost:3000/api/likes/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(like),
      });
    }
    putOldLikes(id, like);
  }
  const sendLike = (evt) => {
    evt.preventDefault();
    dispatch(userSlice.actions.setTanks(true));
    setTimeout(() => {
      dispatch(userSlice.actions.setTanks(false));
    }, 1000);

    let message = evt.target.name;
    socket.emit("send_message", { message });
  };

  socket.on("receive_message", (response) => {
    console.log("ici");
    getOldLikes(response);
  });

  if (skills != null) {
    return (
      <div>
        <Header></Header>
        <div className="withe">
          {language === "FR" ? (
            <p>{skills[0].french_title}</p>
          ) : (
            <p>{skills[0].english_title}</p>
          )}
          <div>
            <fieldset>
              likes CTA :<p id={likes[0]._id}> {likes[0].likes - 1}</p>
              <button name={likes[0]._id} onClick={(evt) => sendLike(evt)}>
                +
              </button>
              likes slider :<p id={likes[1]._id}> {likes[1].likes - 1}</p>
              <button name={likes[1]._id} onClick={(evt) => sendLike(evt)}>
                +
              </button>
            </fieldset>
            <fieldset>
              likes Tools :
              {tools.map((tool) => (
                <div>
                  {" "}
                  {tool.title}{" "}
                  <p id={tool.likes_id}>
                    {likes.find((like) => like._id === tool.likes_id).likes - 1}
                  </p>
                  <button name={tool.likes_id} onClick={(evt) => sendLike(evt)}>
                    +
                  </button>
                </div>
              ))}
            </fieldset>
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
