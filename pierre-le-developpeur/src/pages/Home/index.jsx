import { useState } from "react";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { getLikesThunk, putLikeThunk } from "../../thunkActionsCreator";

function Home() {
  const socket = io.connect("http://localhost:3002");
  const dispatch = useDispatch();

  const skills = useSelector((state) => state.data.skills);
  const likes = useSelector((state) => state.data.likes);
  //let likes = structuredClone(likess);
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");
  const { t, i18n } = useTranslation();

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
    //console.log(id);
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

    let message = evt.target.name;
    socket.emit("send_message", { message });
    /*const putlike = async () => {
      const found = likes.find((like) => like._id === evt.target.name);
      const newValue = found.likes + 1;
      const like = {
        likes: newValue,
        _id: evt.target.name,
      };
      const setLikesResult = await dispatch(putLikeThunk(like));
    };
    putlike();*/
    //getLikes();
  };
  const getLikes = async () => {
    const setLikesResult = dispatch(getLikesThunk());
  };

  socket.on("receive_message", (response) => {
    getOldLikes(response);
  });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  if (skills != null) {
    function francais() {
      setLang("fr");
      changeLanguage("fr");
    }
    function english() {
      setLang("en");
      changeLanguage("en");
    }

    return (
      <main>
        parallax avant le header
        <Header />
        la page
        <p>{t(`welcome`)}</p>
        {lang === "en" ? (
          <p>{skills[0].english_title}</p>
        ) : (
          <p>{skills[0].french_title}</p>
        )}
        <button onClick={() => english()}>English</button>
        <button onClick={() => francais()}>fr</button>
        <div>
          <fieldset>
            likes CTA :<p id={likes[0]._id}> {likes[0].likes}</p>
            <button name={likes[0]._id} onClick={(evt) => sendLike(evt)}>
              +
            </button>
          </fieldset>{" "}
        </div>
      </main>
    );
  } else {
    navigate("/");
  }
}

export default Home;
