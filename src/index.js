import React from "react";
import ReactDOM from "react-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import DragDropList from "./App";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DragDropList />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
