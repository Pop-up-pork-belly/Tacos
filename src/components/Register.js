import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import { borderColor } from "@mui/system";
import { registerUser } from "../api/index";

const Register = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);

   
    // const email = event.target.email.value;
    const newPassword = event.target.newPassword.value;

    if (newPassword.length < 8) {
      return alert("Password must be at least 8 characters");
    }
    if (email === "") {
      return alert("Please enter a Email Address");
    }

    registerNewUser(email, newPassword);
    setNewPassword("");
    setEmail("");
    setIsAdmin(false);
  };

  const registerNewUser = async (email, password) => {
    try {
      const result = await registerUser(email, password);
      // localStorage.setItem("token", result.token);
      // setToken(result.token);
      // return result.token;
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const handlePassChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
                value={email}
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
