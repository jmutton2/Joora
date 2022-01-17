import React from "react";
import ReactDOM from "react-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import DragDropList from "./App";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <DragDropList />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
