import "./cofee.css";

function Cofee() {
  return (
    <div className="cofeeContainer">
      <img
        src="http://localhost:3001/assets/cofee.png"
        className="cofee"
        alt="cofee"
      ></img>
      <div className="smoke">
        <div className="cofeeSmoke"></div>
        <div className="cofeeSmoke secondSmoke"></div>
        <div className="cofeeSmoke"></div>
      </div>
    </div>
  );
}

export default Cofee;
