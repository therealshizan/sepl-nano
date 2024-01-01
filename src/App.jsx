import { useState } from "react";
import { Typography, Stack, Container, ThemeProvider } from "@mui/material";

import "@fontsource/montserrat";

import "./App.css";

import { EntriesContext } from "./EntriesContext";
import MainForm from "./MainForm";
import EntriesTable from "./EntriesTable";
import theme from "./theme";

const App = () => {
  const [entries, setEntries] = useState([]);

  // console.log(entries);

  return (
    <ThemeProvider theme={theme}>
      <EntriesContext.Provider value={{ entries, setEntries }}>
        <Container>
          <Typography variant="h6" sx={{ m: 2, mb: 0, fontWeight: 600 }}>
            Estimate Calculation For Coating With NanoMagic
          </Typography>
          <Typography variant="body1" sx={{ m: 2, mt: 0 }}>
            Please Enter Your Details
          </Typography>

          <Stack direction={'column-reverse'}>
            <MainForm />
            <EntriesTable />
          </Stack>
        </Container>
      </EntriesContext.Provider>
    </ThemeProvider>
  );
};

export default App;
