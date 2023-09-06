import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
} from "@mui/joy";
import { CardMedia } from "@mui/material";
import Add from "@mui/icons-material/Add";
import ProductModal from "./ProductsModal";

const Products = ({}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const fetchProducts = async () => {
    try {
      const result = await fetch(`http://localhost:4000/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await result.json();

      console.log(data);
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box>
      <main>
        <Container py={9}>
          <Grid container spacing={5}>
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                style={{ marginTop: "20px" }}
              >
                <Card
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  sx={{ backgroundColor: "#61677A" }}
                >
                  <CardMedia
                    component="img"
                    alt={product.title}
                    height="250"
                    image={product.image}
                  />
                  <CardContent flexGrow={1}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      textColor={"primary.100"}
                    >
                      {product.name}
                    </Typography>
                    <Typography textColor={"primary.100"}>
                      {product.description}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ marginTop: "10px" }}
                      textColor={"primary.100"}
                    >
                      {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="md" variant="soft" color="primary" onClick={() => openModal(product)}>
                      View
                    </Button>
                    <Button
                      size="md"
                      variant="soft"
                      color="neutral"
                      startDecorator={<Add />}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          onClose={closeModal}
          product={selectedProduct}
        />
      )}
          </Grid>
        </Container>
      </main>
    </Box>
  );
};

export default Products;
