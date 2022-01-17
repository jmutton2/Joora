import React from "react";
import { addColumnAction, removeColumnAction, addItemAction } from "../actions";
import { useDispatch } from "react-redux";
import "../css/style.css";

const Buttons = () => {
  const dispatch = useDispatch();

  return (
    <div class="buttons">
      <button
        type="button"
        class="myButton"
        style={{
          display: "flex",
          justifyContent: "space-around",
          fontFamily: "Uni Sans Heavy",
        }}
        onClick={() => {
          dispatch(addColumnAction());
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        class="myButton"
        style={{
          display: "flex",
          justifyContent: "space-around",
          fontFamily: "Uni Sans Heavy",
        }}
        onClick={() => {
          dispatch(removeColumnAction());
        }}
      >
        Remove last column
      </button>
      <button
        type="button"
        class="myButton"
        style={{
          display: "flex",
          justifyContent: "space-around",
          fontFamily: "Uni Sans Heavy",
        }}
        onClick={() => {
          dispatch(addItemAction());
        }}
      >
        Add new item
      </button>
    </div>
  );
};

export default Buttons;
