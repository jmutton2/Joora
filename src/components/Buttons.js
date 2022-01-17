import React from "react";
import { addColumnAction, removeColumnAction, addItemAction } from "../actions";
import { useDispatch } from "react-redux";
import Entry from "./Entry";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../css/style.css";

const Buttons = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  return (
    <div style={{ width: 200 }} class="buttons">
      <div>
        <Button variant="contained" onClick={handleOpen}>
          Open modal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Entry />
        </Modal>
      </div>
      <Button
        variant="contained"
        className="myButton"
        disabled={false}
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
      </Button>
      <Button
        variant="contained"
        className="myButton"
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
      </Button>
      <Button
        variant="contained"
        className="myButton"
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
      </Button>
    </div>
  );
};

export default Buttons;
