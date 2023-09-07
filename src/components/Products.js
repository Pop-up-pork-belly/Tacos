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
import ProductModal from "./ProductModal";
import AddedToCartModal from "./addedToCartModal";

const Products = ({}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddedToCartModalOpen, setIsAddedToCartModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  
  const initialProducts = [
    {
      id: 1,
      name: "Faze Clan 2024 Diamond Jersey",
      description: "Newest Jersey for our supporters",
      price: 60,
      image:
        "https://shop.fazeclan.com/cdn/shop/products/Jersey-_0000_Front-min_700x.jpg?v=1677657080",
    },
    {
      id: 2,
      name: "2023 Cloud9 Official Summer Jersey",
      description: "League of Legends Edition",
      price: 80,
      image:
        "https://store.cloud9.gg/cdn/shop/files/LOL_Front_400x.png?v=1685159158",
    },
    {
      id: 3,
      name: "NAVI x PUMA 2023 Pro Kit",
      description: "Gameday Jersey",
      price: 50,
      image:
      "https://shop.navi.gg/files/resized/products/navi67131-2.400x400.png.webp",
    },
   
    {
      id: 4,
      name: "100T 2023 Glacial Jersey",
      description: "Gameday Jersey",
      price: 100,
      image:
      "https://100thieves.com/cdn/shop/files/100thieves_JERSEY_1x1_001.jpg?v=1687306724&width=1280",
    },
    {
      id: 5,
      name: "2023 Cloud9 Official Summer Jersey",
      description: "CSGO & SSBM Pro Edition",
      price: 50,
      image:
      "https://store.cloud9.gg/cdn/shop/files/BC_Front_400x.png?v=1690921901",
    },
    {
      id: 6,
      name: "Bape X Faze Clan",
      description: "Game Tee",
      price: 150,
      image:
      "https://shop.fazeclan.com/cdn/shop/products/jersey-min_700x.png?v=1676880145",
    },
    {
      id: 7,
      name: "2023 Cloud9 Official Summer Jersey",
      description: "VALORANT Edition",
      price: 60,
      image:
      "https://store.cloud9.gg/cdn/shop/files/VAL_Front_1_400x.png?v=1685159919",
    },
    {
      id: 8,
      name: "100T 2024 Primary Jersey",
      description: "Primary Jersey for the 2023 season",
      price: 70,
      image:
      "https://100thieves.com/cdn/shop/products/100Thieves_Jersey_001copy-min.jpg?v=1673292429&width=1280",
    },
    {
      id: 9,
      name: "Atlanta Faze Black ",
      description: "2023 Pro Jersey",
      price: 60,
      image:
      "https://shop.fazeclan.com/cdn/shop/products/Faze-ATL-_0005_Front-min_600x.jpg?v=1674114905",
    },
    {
      id: 10,
      name: "NAVI x PUMA 2022 T-Shirt",
      description: "Last years supporter T-Shirt",
      price: 30,
      image:
        "https://store.cloud9.gg/cdn/shop/files/LOL_Front_400x.png?v=1685159158",
    },

    
  ];

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const addToCart = () => {
    setIsAddedToCartModalOpen(true)
  }
  const openModal = (product) => {
    setSelectedProduct(product);

  };

  const closeModal = () => {
    setIsAddedToCartModalOpen(false)
    setSelectedProduct(null);
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
                    alt={product.name}
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
                      onClick={addToCart} 
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
      <AddedToCartModal isOpen={isAddedToCartModalOpen} onClose={closeModal} />
    </Box>
  );
};

export default Products;
