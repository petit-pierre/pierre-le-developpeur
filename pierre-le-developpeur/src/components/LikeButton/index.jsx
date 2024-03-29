import io from "socket.io-client";
import "./like.css";
import { useSelector } from "react-redux";

function LikeButton(id, color) {
  const likes = useSelector((state) => state.data.likes);

  const sendLike = (evt, id) => {
    evt.preventDefault();
    const socket = io.connect("http://api.petitpierre.net");
    //const socket = io.connect("http://localhost:3000");
    document.querySelector(".button" + id.id).classList.add("checked");
    setTimeout(() => {
      document.querySelector(".button" + id.id).classList.remove("checked");
    }, 1000);

    let message = id.id;
    socket.emit("send_message", { message });
    document.querySelector(".maGanache").src =
      "http://pierre-le-developpeur.com/assets/thanks.png";
    setTimeout(() => {
      document.querySelector(".maGanache").src =
        "http://pierre-le-developpeur.com/assets/pierre.png";
    }, 1000);

    getOldLikes(id);
  };

  async function getOldLikes(id) {
    const get = await fetch("http://api.petitpierre.net/api/likes", {
      method: "GET",
    });
    const newlikes = await get.json();
    const found = newlikes.find((like) => like._id === id.id);
    const newValue = found.likes + 1;
    const like = {
      likes: newValue,
    };

    async function putOldLikes(id, like) {
      const put = await fetch("http://api.petitpierre.net/api/likes/" + id.id, {
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

  const found = likes.find((like) => like._id === id.id);

  return (
    <div className="like">
      <p id={id.id}>
        {" "}
        {Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 2,
        }).format(found.likes)}{" "}
      </p>
      <button
        name={id.id}
        onClick={(evt) => sendLike(evt, id)}
        className={
          color === "withe"
            ? "buttonLike button withLike" + id.id
            : "buttonLike button" + id.id
        }
      >
        <div className="pocContain">
          <div className="poc poc1">.</div>
          <div className="poc poc2">.</div>
          <div className="poc poc3">.</div>
          <div className="poc poc4">.</div>
          <div className="poc poc5">.</div>
          <img
            src="http://pierre-le-developpeur.com/assets/logo like.png"
            alt="logo like"
            className="logoLike"
          ></img>
        </div>
      </button>
    </div>
  );
}

export default LikeButton;
