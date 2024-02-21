import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Token",
  initialState: {
    token: null,
    projects: null,
    translations: null,
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

    setTranslations: (currentState, action) => {
      const translations = { ...currentState, translations: action.payload };
      return translations;
    },
  },
});
