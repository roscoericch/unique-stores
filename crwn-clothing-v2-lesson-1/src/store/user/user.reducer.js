// import { USER_ACTION_TYPE } from "./user.types";
// // const [state, dispatch] = useReducer(first, second, third);

// const INITIAL_STATE = {
//   currentUser: null,
// };

// export const userReducer = (state = INITIAL_STATE, action) => {
//   console.log(action);
//   console.log("dispatched");
//   const { type, payload } = action;
//   switch (type) {
//     case USER_ACTION_TYPE.SET_CURRENT_USER:
//       return {
//         ...state,
//         currentUser: payload,
//       };
//     default:
//       return state;
//   }
// };
import USER_ACTION_TYPE from "./user.types";

export const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_ACTION_TYPE.SIGN_IN_FAILED:
    case USER_ACTION_TYPE.SIGN_OUT_FAILED:
    case USER_ACTION_TYPE.SIGN_UP_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
