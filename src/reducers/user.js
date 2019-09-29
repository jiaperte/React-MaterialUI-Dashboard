import {
  USER_SIGNS_IN_START,
  USER_LOGS_OUT,
  USER_SIGNS_IN_SUCCEEDED,
  USER_SIGNS_IN_FAILURE
} from "../constants/actionTypes.js";
import { CHANGE_USER_NAME } from "../constants/actionTypes.js";

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNS_IN_START: {
      return {
        ...state,
        status: "signed_in",
        username: action.username,
        password: action.password
      };
    }
    case CHANGE_USER_NAME: {
      return {
        ...state,
        userName: action.userName
      };
    }
    default:
      return state;
  }
};

export default user;
