import Header from "../../components/Header";
import "./404.css";

function Error404() {
  return (
    <div>
      <Header />
      <h1 className="errorRedirect">404 Boom !!!</h1>
    </div>
  );
}

export default Error404;
