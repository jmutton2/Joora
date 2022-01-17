import React from "react";
import "../css/style.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

const Entry = () => {
  const [action, setAction] = React.useState("");

  const handleChange = (event) => {
    setAction(event.target.value);
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={action}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"create"}>Create</MenuItem>
          <MenuItem value={"delete"}>Delete</MenuItem>
        </Select>
        <Button variant="contained">COMMIT</Button>
      </FormControl>
      <h1>THIS IS AN ENTRY</h1>
      <p>General information about the entry, maybe a description</p>
    </div>
  );
};

export default Entry;
