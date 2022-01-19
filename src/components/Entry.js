import React, { useState } from "react";
import { addItemAction } from "../actions";
import { useDispatch } from "react-redux";
import "../css/style.css";

const Entry = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    id: "",
    content: "",
    description: "",
    severity: "",
  });

  const handleSubmit = (e) => {
    dispatch(addItemAction(state));
  };

  function handleIDChang(e) {
    let id = state.id;
    id = e.target.value;
    setState((prevState) => {
      return { ...prevState, id: id };
    });
  }

  function handleContentChange(e) {
    let content = state.content;
    content = e.target.value;
    setState((prevState) => {
      return { ...prevState, content: content };
    });
  }

  function handleDescriptionChange(e) {
    let description = state.description;
    description = e.target.value;
    setState((prevState) => {
      return { ...prevState, description: description };
    });
  }

  function handleSeverityChange(e) {
    var severity = state.severity;
    severity = e.target.value;
    setState((prevState) => {
      return { ...prevState, severity: severity };
    });
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 500,
        background: "#FFFFFF",
        color: "black",
      }}
    >
      <div>
        <label>ID</label>
        <input type="text" value={state.id} onChange={handleIDChang} />
        <br />
        <label>CONTENT</label>
        <input
          type="text"
          value={state.content}
          onChange={handleContentChange}
        />
        <br />
        <label>DESCRIPTION</label>
        <input
          type="text"
          value={state.description}
          onChange={handleDescriptionChange}
        />
        <br />
        <label>Severity: </label>
        <select value={state.severity} onChange={handleSeverityChange}>
          <option value="HIGH">HIGH</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="LOW">LOW</option>
        </select>
      </div>
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  );
};

export default Entry;
