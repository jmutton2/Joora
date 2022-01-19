import React from "react";
// import { useDispatch } from "react-redux";
import Entry from "./Entry";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../css/style.css";

const Buttons = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ width: 200, paddingLeft: 10 }} class="buttons">
      {/* <Button
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
      </Button> */}
      {/* <Button
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
      </Button> */}
      <Button
        key="AddEntryButton"
        variant="contained"
        style={{
          display: "flex",
          justifyContent: "space-around",
          fontFamily: "Uni Sans Heavy",
          background: "#7289da ",
        }}
        onClick={() => {
          handleOpen();
        }}
      >
        Add new item
      </Button>
      <Modal
        key="AddEntryModal"
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
      >
        <Entry />
      </Modal>
    </div>
  );
};

export default Buttons;
