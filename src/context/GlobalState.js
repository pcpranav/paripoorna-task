import React, { createContext, useReducer, useState } from "react";
import { AppReducer } from "./AppReducer";
import axios from "axios";

const initialState = {
  userInfo: [],
  singleUser: [],
  error: null,
  loading: true,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  const [flag, setFlag] = useState(false);

  async function getDetails() {
    try {
      const res = await axios.get("http://localhost:5000/api/user");
      dispatch({
        type: "GET_DETAILS",
        payload: res.data.userData,
      });
    } catch (err) {
      dispatch({
        type: "DETAILS_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteUser(id) {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);

      dispatch({
        type: "DELETE_USER",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "DETAILS_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function addUser(user) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user",
        user,
        config
      );

      dispatch({
        type: "ADD_USER",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "USER_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function updateUser(id, user) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/user/${id}`,
        user,
        config
      );

      dispatch({
        type: "UPDATE_USER",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "USER_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function oneUserDetails(id) {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${id}`);
      dispatch({
        type: "SINGLE_USER_DETAILS",
        payload: res.data.singleUser,
      });
    } catch (err) {
      dispatch({
        type: "DETAILS_ERROR",
        payload: err.response.data.error,
      });
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        userInfo: state.userInfo,
        error: state.error,
        loading: state.loading,
        singleUser: state.singleUser,
        getDetails,
        addUser,
        deleteUser,
        oneUserDetails,
        updateUser,
        flag,
        setFlag,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
