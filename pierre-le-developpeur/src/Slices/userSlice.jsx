import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Token",
  initialState: {
    token: null,
    user: null,
    email: null,
    id: null,
    firstName: null,
    lastName: null,
  },
  reducers: {
    setToken: (currentState, action) => {
      const token = { ...currentState, token: action.payload };
      return token;
    },

    setProjects: (currentState, action) => {
      const projects = { ...currentState, projects: action.payload };
      return projects;
    },
  },
});
