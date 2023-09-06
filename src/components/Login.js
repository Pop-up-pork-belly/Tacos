import React, { useState } from "react";
// import { BASE_URL } from "./api";

import { Container, Typography, TextField, Button, Grid } from "@mui/material";

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await login(email, password);

      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/login`,
      {
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
      },
    );
    const result = await response.json();

    if (result?.data?.token) {
      localStorage.setItem("token", result.data.token);
    } else {
      setError("Failed to login, please try again!");
      throw new Error("No Token");
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center" style={{ color: "white" }}>
            Login
          </Typography>
          {error && (
            <Typography
              variant="inherit"
              align="center"
              style={{ color: "red" }}
            >
              {error}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={email}
              onChange={handleEmailChange}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={password}
              onChange={handlePassChange}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{ color: "white" }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;

