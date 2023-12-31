import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

const Popup = ({ open, onClose, downloadCSV }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    // Check if required fields are filled
    if (name.trim() !== "" && phone.trim() !== "" && email.trim() !== "") {
      try {
        // Send data to the server
        const response = await fetch("http://localhost/sepl-nano-server/index.php", {
          method: "POST",
          body: JSON.stringify({ name, phone, email }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Handle server response
        const data = await response.json();

        // Perform additional actions
        downloadCSV();
        onClose();
      } catch (error) {
        console.error(error);
      }
    } else {
      // Display an alert if required fields are not filled
      alert("Please Fill All Required Fields");
    }
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit & Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
