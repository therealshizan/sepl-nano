import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { CircularProgress, List, ListItem, Stack, Typography } from "@mui/material";

const Popup = ({ open, onClose, downloadCSV, handlePrint }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false)

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    // You can perform actions with the user details here
    if (name.trim() !== "" && phone.trim() !== "" && email.trim() !== "") {
      console.log("Name:", name);
      console.log("Phone:", phone);
      console.log("Email:", email);


      setLoading(true)
      fetch("https://seplnanomagic.com/server/index.php", {
        method: "POST",
        body: JSON.stringify({ name, phone, email }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          handlePrint()
          setLoading(false)
          onClose();
          console.log(data.message);
        })
        .catch((error) => {
          console.error(error);
        });



    } else {
      alert("Please Fill All Required Fields")
    }



    // Close the dialog
  };

  const getData = async () => {
    const response = await fetch("userData.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: 1 }),
    });
    if (response) {
      console.log(response);
    }
  };

  getData();

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Enter Your Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phone}
            type="tel"
            onChange={handlePhoneChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            type="email"
            onChange={handleEmailChange}
          />
          <Stack>
            <Typography variant="body1" fontWeight={600}>Terms and conditions:-</Typography>
            <List disablePadding sx={{ listStyleType: 'disc' }}>
              <ListItem sx={{ display: 'list-item' }} disablePadding><Typography variant="body2">These are product cost estimation only.</Typography></ListItem>
              <ListItem sx={{ display: 'list-item' }} disablePadding><Typography variant="body2">Application/Labour cost is not included in case required.</Typography></ListItem>
              <ListItem sx={{ display: 'list-item' }} disablePadding><Typography variant="body2">Actual quotation will be send to you by mail after you receive a call from our office and post site visit by our representative for actual measurements if necessary.</Typography></ListItem>
              <ListItem sx={{ display: 'list-item' }} disablePadding><Typography variant="body2">Additional GST of 18% will be applicable on invoice / quotation mailed to you.</Typography></ListItem>
            </List>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: '#D7B56D' }} onClick={onClose}>Cancel</Button>
          <Button sx={{ bgcolor: '#D7B56D', '&:hover': { bgcolor: '#D7B56D' } }} disabled={loading} endIcon={loading && <CircularProgress />} onClick={handleSubmit} variant="contained">
            {loading ? 'Please Wait' : 'Submit & Download'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Popup;
