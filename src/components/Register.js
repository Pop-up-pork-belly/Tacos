import React, { useState } from "react";
import { BASE_URL } from "./api";

const Register = ({token, setToken }) => {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();

        const newUsername = event.target.newUsername.value;
        const newPassword = event.target.newPassword.value;
        const confirmPassword = event.target.confirmPassword.value;
        const newEmail = event.target.newEmail.value;

        if (newUsername === "") {
            return alert("Please enter a Username")
        }
        if (newPassword.length < 8) {
            return alert("Password must be at least 8 characters")
        }
        if (confirmPassword !== newPassword) {
            return alert("Passwords do not match")
        }
        if (newEmail === "") {
            return alert("Please enter a Email Address")
        }

        setNewUsername("");
        setNewPassword("");
        setConfirmPassword("");
        setNewEmail("");
        setIsAdmin(false);

        const registerUser = async () => {
            try {
                const response = await fetch(`${BASE_URL}users/register`, {
                    method: "POST",
                    headers: {
                        "Content_Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: {
                            username: `${newUsername}`,
                            password: `${newPassword}`,
                            email: `${newEmail}`,
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
        setConfirmedPassword(event.target.value);
      };
      const handleEmailChange = (event) => {
        setNewEmail(event.target.value);
      }
return (
    <div>
      {
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="newUsername"
            value={newUsername}
            onChange={handleNameChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="newPassword"
            value={newPassword}
            onChange={handlePassChange}
          />
          <label htmlFor="confirm password">Confirm Password:</label>
          <input
            type="text"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={newEmail}
            onChange={handleEmailChange}
          />
          <button type="submit">Submit</button>
        </form>
      }
    </div>
  );
    };

export default Register;
