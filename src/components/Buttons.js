import React from "react";
// import { useDispatch } from "react-redux";
import Entry from "./Entry";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "../css/style.css";

export function Buttons() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ width: 200, margin: 10 }} className="buttons">
      <Button
        key="AddEntryButton"
        variant="outlined"
        style={{
          display: "flex",
          justifyContent: "space-around",
          color: "#7289da",
        }}
        onClick={() => {
          handleOpen();
        }}
      >
        Add new item!
      </Button>
      <Modal
        key="AddEntryModal"
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <Entry />
        </div>
      </Modal>
    </div>
  );
}

export default Buttons;
