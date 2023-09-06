import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { borderColor } from "@mui/system";
import { registerUser } from "../api/index";

const Register = ({ token, setToken }) => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    const newEmail = event.target.newEmail.value;
    const newPassword = event.target.newPassword.value;

    if (newPassword.length < 8) {
      return alert("Password must be at least 8 characters");
    }
    if (newEmail === "") {
      return alert("Please enter a Email Address");
    }

    registerNewUser(newEmail, newPassword);
    setNewPassword("");
    setNewEmail("");
    setIsAdmin(false);
  };

  const registerNewUser = async (email, password) => {
    try {
      const result = await registerUser(email, password);
      localStorage.setItem("token", result.token);
      setToken(result.token);
      return result.token;
    } catch (err) {
      console.error(err);
    }
  };

  const handlePassChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };
  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center" style={{ color: "white" }}>
            Register Users
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="newEmail"
                value={newEmail}
                onChange={handleEmailChange}
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white" } }}
              />
              <div style={{ marginBottom: "16px" }}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handlePassChange}
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{ style: { color: "white" } }}
                />
              </div>
            </div>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
