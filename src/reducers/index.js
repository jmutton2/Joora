import entries from "./entries";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  entries: entries,
});
