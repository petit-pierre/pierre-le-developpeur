import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

function Home() {
  const socket = io.connect("http://localhost:3000");

  const skills = useSelector((state) => state.data.skills);
  const navigate = useNavigate();
  const [lang, setLang] = useState("en");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  const { t, i18n } = useTranslation();
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
          {" "}
          <input
            placeholder="Message..."
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}> Send Message</button>
          <h1> Message:</h1>
          {messageReceived}
        </div>
      </main>
    );
  } else {
    navigate("/");
  }
}

export default Home;
