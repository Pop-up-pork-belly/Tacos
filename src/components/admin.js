import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, email: "drewH@gmail.com", isAdmin: false },
    { id: 2, email: "eddie@gmail.com", isAdmin: true },
    { id: 3, email: "Harshil@gmail.com", isAdmin: false },
    { id: 4, email: "dom@gmail.com", isAdmin: true },
    

  ]);

  const toggleAdminStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
       <h1 style={{ color: "white" }}>Admin Dashboard</h1>
      <TableContainer component={Paper} sx={{backgroundColor:"#272727"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>ID</TableCell>
              <TableCell style={{ color: "white" }}>Email</TableCell>
              <TableCell style={{ color: "white" }}>Admin</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} >
                <TableCell style={{ color: "white" }}>{user.id}</TableCell>
                <TableCell style={{ color: "white" }}>{user.email}</TableCell>
                <TableCell style={{ color: "white" }}>{user.isAdmin ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.isAdmin ? "secondary" : "primary"}
                    onClick={() => toggleAdminStatus(user.id)}
                    style={{marginRight: '10px'}}
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                  </Button>
         
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminDashboard