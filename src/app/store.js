import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers/entries";

const composedEnhancer = compose(
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore(reducers, undefined, composedEnhancer);

setTimeout(function () {
  store.dispatch({ type: "SET" });
}, 5000);
