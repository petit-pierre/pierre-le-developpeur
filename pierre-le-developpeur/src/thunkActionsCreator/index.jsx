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
      },
      body: formData,
    });
    let result = await response.json();
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
    };
    getProjects();
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
    };
    getProjects();
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
    const setTranslationsProjects = async () => {
      const getProjectsTranslationResult = await dispatch(
        getProjectTranslationsThunk()
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

export const getTranslationThunk = () => async (dispatch, getstate) => {
  const response = await fetch(
    "http://localhost:3000/api/translations/65d740360e76aef74b084e09",
    {
      method: "GET",
    }
  );

  let result = await response.json();
  dispatch(userSlice.actions.setTranslations(result));
  if (response.ok) {
    return result;
  }
  return false;
};

export const putTranslationThunk =
  (translation, token) => async (dispatch, getstate) => {
    const response = await fetch(
      "http://localhost:3000/api/translations/65d740360e76aef74b084e09",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(translation),
      }
    );

    let result = await response.json();
    const setTranslations = async () => {
      const getTranslationResult = await dispatch(getTranslationThunk());
    };
    setTranslations();
    if (response.ok) {
      return result;
    }
    return false;
  };

export const setSkillThunk = (skill, token) => async (dispatch, getstate) => {
  const response = await fetch("http://localhost:3000/api/skills", {
    method: "POST",

    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(skill),
  });

  let result = await response.json();
  const setSkills = async () => {
    const getSkillsResult = await dispatch(getSkillsThunk());
  };
  setSkills();
  if (response.ok) {
    return result;
  }
  return false;
};

export const deleteSkillThunk =
  (skillId, token) => async (dispatch, getstate) => {
    const response = await fetch(
      "http://localhost:3000/api/skills/" + skillId,
      {
        method: "DELETE",

        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    let result = await response.json();
    const setSkills = async () => {
      const getSkillsResult = await dispatch(getSkillsThunk());
    };
    setSkills();
    if (response.ok) {
      return result;
    }
    return false;
  };

export const getSkillsThunk = () => async (dispatch, getstate) => {
  const response = await fetch("http://localhost:3000/api/skills", {
    method: "GET",
  });

  let result = await response.json();
  dispatch(userSlice.actions.setSkills(result));
  if (response.ok) {
    return result;
  }
  return false;
};

export const setToolThunk = (tool, token) => async (dispatch, getstate) => {
  const response = await fetch("http://localhost:3000/api/tools", {
    method: "POST",

    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(tool),
  });

  let result = await response.json();
  const setTools = async () => {
    const getToolsResult = await dispatch(getToolsThunk());
  };
  setTools();
  if (response.ok) {
    return result;
  }
  return false;
};

export const deleteToolThunk =
  (toolId, token) => async (dispatch, getstate) => {
    const response = await fetch("http://localhost:3000/api/tools/" + toolId, {
      method: "DELETE",

      headers: {
        Authorization: "Bearer " + token,
      },
    });
    let result = await response.json();
    const setTools = async () => {
      const getToolsResult = await dispatch(getToolsThunk());
    };
    setTools();
    if (response.ok) {
      return result;
    }
    return false;
  };

export const getToolsThunk = () => async (dispatch, getstate) => {
  const response = await fetch("http://localhost:3000/api/tools", {
    method: "GET",
  });

  let result = await response.json();
  dispatch(userSlice.actions.setTools(result));
  if (response.ok) {
    return result;
  }
  return false;
};
