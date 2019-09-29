import { USER_SIGNS_IN_START } from "../constants/actionTypes";
import { CHANGE_USER_NAME } from "../constants/actionTypes";
import { USER_LOGS_OUT } from "../constants/actionTypes";
import { USER_SIGNS_IN_SUCCEEDED } from "../constants/actionTypes";
import { USER_SIGNS_IN_FAILURE } from "../constants/actionTypes";
import axios from "axios";
import Qs from "qs";

export function changeUserName({ email }) {
  return {
    type: CHANGE_USER_NAME,
    email
  };
}

export function userLogsOut() {
  return {
    type: USER_LOGS_OUT
  };
}

export function userSignsIn({ data, history }) {
  let postdata = {
    grant_type: "password",
    ...data
  };

  return async dispatch => {
    dispatch({
      type: USER_SIGNS_IN_START,
      ...data
    });
    try {
      //send auth request to server...
      const response = await axios({
        method: "post",
        url: "/Token",
        data: Qs.stringify(postdata)
      });

      //Succeeded
      dispatch({
        type: USER_SIGNS_IN_SUCCEEDED,
        ...data
      });
      localStorage.setItem("jwt", response.data.access_token);
      history.replace("/");
    } catch (err) {
      dispatch({
        type: USER_SIGNS_IN_FAILURE,
        ...data
      });
    }
  };
}
