import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";

const Popup = ({ open, onClose, downloadCSV }) => {
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
          downloadCSV()
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
        </DialogContent>
        <DialogActions>
          <Button sx={{color: '#D7B56D'}} onClick={onClose}>Cancel</Button>
          <Button sx={{bgcolor: '#D7B56D', '&:hover': {bgcolor: '#D7B56D'}}} disabled={loading} endIcon={loading && <CircularProgress/>} onClick={handleSubmit} variant="contained">
            {loading ? 'Please Wait' : 'Submit & Download'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Popup;
