import React from "react";
import { addItemAction } from "../actions";
import { useDispatch } from "react-redux";
import "../css/style.css";

const Entry = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItemAction());
  };

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
      }}
    >
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Entry;
