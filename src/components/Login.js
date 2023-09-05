import React, { useState } from "react";
// import { BASE_URL } from "./api";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
  } from "@mui/material";

const Login = ({token, setToken}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        setEmail("");
        setPassword("");

        const loginUser = async () => {
            try {
                const response = await fetch (`${BASE_URL}users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: {
                            email: `${email}`,
                            password: `${password}`,
                        },
                    }),
                });
                const result = await response.json();
                console.log(result)
                localStorage.setItem('token', result.data.token)
                return result;
            } catch (err) {
                console.error(err)
            }
        };
        loginUser();
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePassChange = (event) => {
        setPassword(event.target.value);
    };
    return (
        <Container maxWidth="sm">
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" align="center" style={{ color: 'white' }}>
                Login
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
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
              </form>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePassChange}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <Button variant="contained" color="primary" type="submit" fullWidth style={{ color: 'white' }}>
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Container>
      );
    };

export default Login;