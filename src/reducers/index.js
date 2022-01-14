import counterReducer from "./counter";
import entries from "./entries";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  counter: counterReducer,
  entries: entries,
});
