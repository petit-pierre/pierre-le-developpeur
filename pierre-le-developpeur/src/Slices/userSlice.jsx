import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Token",
  initialState: {
    token: null,
    projects: null,
    translations: null,
    skills: null,
    tools: null,
    sliders: null,
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

    setSkills: (currentState, action) => {
      const skills = { ...currentState, skills: action.payload };
      return skills;
    },

    setTools: (currentState, action) => {
      const tools = { ...currentState, tools: action.payload };
      return tools;
    },

    setSliders: (currentState, action) => {
      const sliders = { ...currentState, sliders: action.payload };
      return sliders;
    },
  },
});
