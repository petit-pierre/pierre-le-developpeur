import { useNavigate } from "react-router-dom";

function Loading() {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/Home");
  }, 1500);

  return <main>Loading ...</main>;
}

export default Loading;
