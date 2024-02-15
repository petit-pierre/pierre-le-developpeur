import { userSlice } from "../Slices/userSlice";
import { setStorage } from "../utils/localStorage";

export const setTokenThunk =
  (email, password, rememberChecked) => async (dispatch, getState) => {
    const response = await fetch("http://localhost:3001/api/V1/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const result = await response.json();
      dispatch(userSlice.actions.setToken(result.body.token));
      if (rememberChecked === true) {
        setStorage(result.body.token);
      }
      return true;
    }
    return false;
  };

export const setProfilThunk = (token) => async (dispatch, getState) => {
  const response = await fetch("http://localhost:3001/api/V1/user/profile", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  if (response.ok) {
    const result = await response.json();
    dispatch(userSlice.actions.setUser(result.body.userName));
    dispatch(userSlice.actions.setId(result.body.id));
    dispatch(userSlice.actions.setEmail(result.body.email));
    dispatch(userSlice.actions.setFirstName(result.body.firstName));
    dispatch(userSlice.actions.setLastName(result.body.lastName));
    return true;
  }
  return false;
};

export const setUsernameThunk =
  (finalUserName, token) => async (dispatch, getState) => {
    const response = await fetch("http://localhost:3001/api/V1/user/profile", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ userName: finalUserName }),
    });
    if (response.ok) {
      dispatch(userSlice.actions.setUser(finalUserName));
      return true;
    }
    return false;
  };
