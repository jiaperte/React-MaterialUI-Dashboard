import { combineReducers } from "redux";
import user from "./user";
//import students from "./students";

const entities = combineReducers({
  //students
});
export default combineReducers({
  user,
  entities
});
