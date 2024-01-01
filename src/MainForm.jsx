import { useState } from "react";
import InputGroup from "./InputGroup";
import { ButtonGroup, Button } from "@mui/material";
import theme from "./theme";

const colors = {
  success: "#007e33",
  info: "#0099cc",
};

const MainForm = () => {
  const [inputGroups, setInputGroups] = useState([<InputGroup key={0} />]);

  const addMoreArea = () => {
    const newInputGroups = [
      ...inputGroups,
      <InputGroup key={inputGroups.length} />,
    ];
    setInputGroups(newInputGroups);
  };
  return (
    <div style={{ flex: 2, border: "1px solid #00000025" }}>
      {inputGroups.map((inputGroup) => inputGroup)}
      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "space-around",
          boxShadow: 0,
          m: 2,
        }}
        variant="contained"
      >
        <Button
          size="small"
          onClick={addMoreArea}
          sx={{ color: '#fff' }}
        >
          Add More Area
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MainForm;
