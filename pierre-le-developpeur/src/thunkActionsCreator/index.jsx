import { userSlice } from "../Slices/userSlice";
import { setStorage } from "../utils/localStorage";

export const setTokenThunk =
  (email, password, rememberChecked) => async (dispatch, getState) => {
    const response = await fetch("http://localhost:3000/api/user/log_in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      dispatch(userSlice.actions.setToken(result.token));
      if (rememberChecked === true) {
        setStorage(result.token);
      }
      return true;
    }
    return false;
  };

export const setProjectPictureThunk =
  (formData, token) => async (dispatch, getstate) => {
    const response = await fetch("http://localhost:3000/api/pictures", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        //"Content-Type": "multipart/form-data",
      },
      body: formData,
      //redirect: "follow",
    });
    let result = await response.json();
    //console.log(result);
    if (response.ok) {
      //const result = await response.json();
      //dispatch(userSlice.actions.setToken(result.token));
      return result;
    }
    return false;
  };

export const setProjectThunk =
  (newProject, token) => async (dispatch, getstate) => {
    const response = await fetch("http://localhost:3000/api/projects", {
      method: "POST",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newProject),
    });
    let result = await response.json();
    const getProjects = async () => {
      const getProjectResult = await dispatch(getProjectsThunk());
      dispatch(userSlice.actions.setProjects(await getProjectResult));
    };
    getProjects();
    //dispatch(userSlice.actions.setProjects(result));
    if (response.ok) {
      return result;
    }
    return false;
  };

export const setProjectTranslationThunk =
  (projectTranslation, token) => async (dispatch, getstate) => {
    const response = await fetch("http://localhost:3000/api/translations", {
      method: "POST",

      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(projectTranslation),
    });

    let result = await response.json();
    //dispatch(userSlice.actions.setTranslations(result));
    const setTranslationsProjects = async () => {
      const getProjectsTranslationResult = await dispatch(
        getProjectTranslationsThunk()
      );
      dispatch(
        userSlice.actions.setProjects(await getProjectsTranslationResult)
      );
    };
    setTranslationsProjects();
    if (response.ok) {
      return result;
    }
    return false;
  };

export const deleteProjectTranslationThunk =
  (translationId, token) => async (dispatch, getstate) => {
    const response = await fetch(
      "http://localhost:3000/api/translations/" + translationId,
      {
        method: "DELETE",

        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let result = await response.json();
    const setTranslationsProjects = async () => {
      const getProjectsTranslationResult = await dispatch(
        getProjectTranslationsThunk()
      );
      dispatch(
        userSlice.actions.setProjects(await getProjectsTranslationResult)
      );
    };
    setTranslationsProjects();
    if (response.ok) {
      return result;
    }
    return false;
  };

export const getProjectTranslationsThunk = () => async (dispatch, getstate) => {
  const response = await fetch("http://localhost:3000/api/translations", {
    method: "GET",
  });

  let result = await response.json();
  dispatch(userSlice.actions.setTranslations(result));
  if (response.ok) {
    return result;
  }
  return false;
};

export const getProjectsThunk =
  (newProject, token) => async (dispatch, getstate) => {
    const response = await fetch("http://localhost:3000/api/projects", {
      method: "GET",
    });
    let result = await response.json();
    dispatch(userSlice.actions.setProjects(result));
    if (response.ok) {
      return result;
    }
    return false;
  };

export const deletePictureThunk = (id, token) => async (dispatch, getstate) => {
  const response = await fetch("http://localhost:3000/api/pictures/" + id, {
    method: "DELETE",

    headers: {
      Authorization: "Bearer " + token,
    },
  });
  let result = await response.json();
  if (response.ok) {
    return result;
  }
  return false;
};

export const deleteProjectThunk =
  (projectId, token) => async (dispatch, getstate) => {
    const response = await fetch(
      "http://localhost:3000/api/projects/" + projectId,
      {
        method: "DELETE",

        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let result = await response.json();
    const getProjects = async () => {
      const getProjectResult = await dispatch(getProjectsThunk());
      dispatch(userSlice.actions.setProjects(await getProjectResult));
    };
    getProjects();
    if (response.ok) {
      return result;
    }
    return false;
  };
