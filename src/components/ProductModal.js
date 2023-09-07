import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  CardMedia,
  CardContent,
} from "@mui/material";

const ProductModal = ({ isOpen, onClose, product }) => {
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
          backgroundColor:"#61677A"
        }}
      >
        <CardMedia
          component="img"
          alt={product.title}
          height="250"
          image={product.image}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            {product.price}
          </Typography>
          <Button onClick={onClose}>Close</Button>
        </CardContent>
      </Box>
    </Modal>
  );
};

export default ProductModal;
