import io from "socket.io-client";
import "./like.css";
import { useSelector } from "react-redux";

function LikeButton(id) {
  const likes = useSelector((state) => state.data.likes);
  const socket = io.connect("http://localhost:3000");

  const sendLike = (evt, id) => {
    evt.preventDefault();
    document.querySelector(".button" + id.id).classList.add("checked");
    setTimeout(() => {
      document.querySelector(".button" + id.id).classList.remove("checked");
    }, 1000);

    let message = id.id;
    socket.emit("send_message", { message });
    document.querySelector(".maGanache").src =
      "http://localhost:3001/assets/thanks.png";
    setTimeout(() => {
      document.querySelector(".maGanache").src =
        "http://localhost:3001/assets/pierre.png";
    }, 1000);

    getOldLikes(id);
  };

  async function getOldLikes(id) {
    const get = await fetch("http://localhost:3000/api/likes", {
      method: "GET",
    });
    const newlikes = await get.json();
    const found = newlikes.find((like) => like._id === id.id);
    const newValue = found.likes + 1;
    const like = {
      likes: newValue,
    };

    async function putOldLikes(id, like) {
      const put = await fetch("http://localhost:3000/api/likes/" + id.id, {
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
        className={"buttonLike button" + id.id}
      >
        <img
          src="./assets/logo like.png"
          alt="logo like"
          className="logoLike"
        ></img>
      </button>
    </div>
  );
}

export default LikeButton;
