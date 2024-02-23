import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../Header";
import { useState } from "react";

function UpdateInfo() {
  const token = useSelector((state) => state.data.token);
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  function projectChange() {
    setEdit(!edit);
  }
  const dispatch = useDispatch();

  if (token === null) {
    return <Navigate to="../404/" replace={true} />;
  }

  function saveInfo() {}

  return (
    <main>
      {edit === true ? (
        <p></p>
      ) : (
        <div>
          <button className="edit-button" onClick={projectChange}>
            Update info
          </button>
        </div>
      )}

      {edit === true ? (
        <div>
          <h1>Info</h1>
          <fieldset>
            <p>Placeholder for mail in french :</p>
            <input type="text"></input>
            <p>Placeholder for mail in english :</p>
            <input type="text"></input>
            <p>Placeholder for message in french :</p>
            <input type="text"></input>
            <p>Placeholder for message in english :</p>
            <input type="text"></input>
            <p>Content in french :</p>
            <input type="text"></input>
            <p>Content in english :</p>
            <input type="text"></input>
            <p>Button in french :</p>
            <input type="text"></input>
            <p>Button in english :</p>
            <input type="text"></input>
            <p>Mail error in french :</p>
            <input type="text"></input>
            <p>Mail error in english :</p>
            <input type="text"></input>
            <p>Content error in french :</p>
            <input type="text"></input>
            <p>Content error in english :</p>
            <input type="text"></input>
            <p>Succes in french :</p>
            <input type="text"></input>
            <p>Succes in english :</p>
            <input type="text"></input>
          </fieldset>
          <fieldset>
            <p>Recommendation in french :</p>
            <input type="text"></input>
            <p>Recommendation in english :</p>
            <input type="text"></input>
          </fieldset>
          <p></p>
          <button onClick={projectChange}>Cancel</button>
          <button onClick={saveInfo()}>Save</button>
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
}

export default UpdateInfo;
