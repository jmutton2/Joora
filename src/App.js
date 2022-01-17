import React from "react";
import SideBar from "./components/Buttons";
import DragDropList from "./components/DragDropList";
import "./css/style.css";

const App = () => {
  return (
    <div style={{ display: "flex", background: "#e3f2fd  ", height: "100vh" }}>
      {/* <div style={{ display: "flex", background: "#2c2f33", height: "100vh" }}> */}
      <SideBar />
      <DragDropList />
    </div>
  );
};

export default App;
