import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { borderColor } from "@mui/system";
require("dotenv").config();


const Register = ({token, setToken }) => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const newUsername = event.target.newUsername.value;
        const newPassword = event.target.newPassword.value;
        const confirmPassword = event.target.confirmPassword.value;
        const email = event.target.email.value;

        if (newUsername === "") {
            return alert("Please enter a Username")
        }
        if (newPassword.length < 8) {
            return alert("Password must be at least 8 characters")
        }
        if (confirmPassword !== newPassword) {
            return alert("Passwords do not match")
        }
        if (email === "") {
            return alert("Please enter a Email Address")
        }

        setNewUsername("");
        setNewPassword("");
        setConfirmPassword("");
        setEmail("");
        setIsAdmin(false);

        const registerUser = async () => {
            try {
                const response = await fetch(`${DATABASE_URL}users/register`, {
                    method: "POST",
                    headers: {
                        "Content_Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: {
                            username: `${newUsername}`,
                            password: `${newPassword}`,
                            email: `${email}`,
                            isAdmin: false,
                        },
                    }),
                });
                const result = await response.json()
                console.log(result);
                setToken(result.data.token);
                return result.data.token;
            } catch (err) {
                console.error(err);
            }
        }

        registerUser();
    };
    const handleNameChange = (event) => {
        setNewUsername(event.target.value);
      };
      const handlePassChange = (event) => {
        setNewPassword(event.target.value);
      };
      const handleConfirmChange = (event) => {
        setConfirmPassword(event.target.value);
      };
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
      return (
        <Container maxWidth="sm">
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" align="center" style={{ color: 'white' }}>
                Register Users
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name="newUsername"
                    value={newUsername}
                    onChange={handleNameChange}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={handlePassChange}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmChange}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                  />
                </div>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      );
    }

export default Register;