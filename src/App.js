import React from "react";
import SideBar from "./components/Buttons";
import DragDropList from "./components/DragDropList";
import "./css/style.css";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        background: "#23272a",
        height: "100vh",
      }}
    >
      <SideBar />
      <DragDropList />
    </div>
  );
};

export default App;
