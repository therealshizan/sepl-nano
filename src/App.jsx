import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";

import "./App.css";

import { EntriesContext } from "./EntriesContext";
import MainForm from "./MainForm";
import EntriesTable from "./EntriesTable";

const App = () => {
  const [entries, setEntries] = useState([]);

  // console.log(entries);

  return (
    <EntriesContext.Provider value={{ entries, setEntries }}>
      <Box p={8} py={4}>
        <Typography variant="h6" sx={{ m: 2, mb: 0, fontWeight: 600 }}>
          Estimate Calculation For Coating With NanoMagic
        </Typography>
        <Typography variant="body1" sx={{ m: 2, mt: 0 }}>
          Please Enter Your Details
        </Typography>

        <Stack direction={'row'}>
        <MainForm />
        <EntriesTable />
        </Stack>
      </Box>
    </EntriesContext.Provider>
  );
};

export default App;
