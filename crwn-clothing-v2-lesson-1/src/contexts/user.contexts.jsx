import React, { useEffect } from "react";
import { createContext } from "react";
import { useReducer } from "react";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utilities";

export const Usercontext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACVTIVATION_TYPE = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
// const [state, dispatch] = useReducer(first, second, third);

const userReducer = (state, action) => {
  console.log(action);
  console.log("dispatched");
  const { type, payload } = action;
  switch (type) {
    case USER_ACVTIVATION_TYPE.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`unbalanced type ${type} in useReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);
  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACVTIVATION_TYPE.SET_CURRENT_USER, payload: user });
  };
  const value = { currentUser, setCurrentUser };

  //   signOutUser();
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);

  return <Usercontext.Provider value={value}>{children}</Usercontext.Provider>;
};
