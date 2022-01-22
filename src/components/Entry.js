import React, { useState } from "react";
import { addItemAction } from "../actions";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { Select } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
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
    window.location.reload();
  };

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
        background: "rgb(55, 58, 62)",
        color: "black",
      }}
    >
      <div
        style={{
          padding: 20,
          display: "grid",
          gridTemplateColumns: "1.3fr 0.7fr",
          gridTemplateRows: " 1.2fr",
          gap: "0px 0px",
          height: "75%",
        }}
      >
        <div>
          <div style={{ paddingBottom: 10 }}>
            <label style={{ color: "#ffffff" }}>CONTENT</label>
            <br />
            <input
              style={{
                background: "#23272a",
                border: "none",
                color: "#ffffff",
              }}
              type="text"
              value={state.content}
              onChange={handleContentChange}
            />
          </div>
          <div style={{ height: "100%" }}>
            <label style={{ color: "#ffffff" }}>DESCRIPTION</label>
            <textarea
              style={{
                height: "50%",
                width: "80%",
                background: "#23272a",
                border: "none",
                resize: "none",
                color: "#ffffff",
              }}
              type="text"
              value={state.description}
              onChange={handleDescriptionChange}
            />
          </div>
        </div>
        <div>
          <label style={{ color: "#ffffff" }}>Severity: </label>
          <br />
          <Select
            style={{ width: 100 }}
            value={state.severity}
            onChange={handleSeverityChange}
          >
            <MenuItem value="HIGH">HIGH</MenuItem>
            <br />
            <MenuItem value="MEDIUM">MEDIUM</MenuItem>
            <br />
            <MenuItem value="LOW">LOW</MenuItem>
          </Select>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 20,
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default Entry;
