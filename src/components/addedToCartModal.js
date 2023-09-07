import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const AddedToCartModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          backgroundColor: "#61677A"
        }}
      >
        <Typography variant="h5" gutterBottom>
          Added to Cart
        </Typography>
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default AddedToCartModal;