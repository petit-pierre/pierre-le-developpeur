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

    setUser: (currentState, action) => {
      const user = { ...currentState, user: action.payload };
      return user;
    },

    setEmail: (currentState, action) => {
      const email = { ...currentState, email: action.payload };
      return email;
    },

    setId: (currentState, action) => {
      const id = { ...currentState, id: action.payload };
      return id;
    },
    setFirstName: (currentState, action) => {
      const firstName = { ...currentState, firstName: action.payload };
      return firstName;
    },
    setLastName: (currentState, action) => {
      const lastName = { ...currentState, lastName: action.payload };
      return lastName;
    },
  },
});
