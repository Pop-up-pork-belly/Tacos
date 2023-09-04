import React,{useState} from "react";

import { Box, Container, Typography, Button, Grid, Card, CardActions, CardContent, Select, MenuItem, Link, FormControl, Input, IconButton } from "@mui/joy";
import { AppBar, Toolbar, CardMedia, InputLabel, Paper} from "@mui/material";
import Add from "@mui/icons-material/Add";
import { Search } from "@mui/icons-material";

const Products = ({})=> {

  const products = [{

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  }, {

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  }, {

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  },{

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  },{

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  }, {

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  }, {

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  }, {

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  }, {

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  },{

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  }, {

    id: 1,
    title: "Sentinals Tenz Shirt",
    description: "Best in the world, player for SEN",
    price: "$59.99",
    image: "https://shop.sentinels.gg/cdn/shop/files/Shopify_Exports_01_1024x1024@2x.png?v=1692127340",
  }];
 
  return (
    <Box>
    <AppBar position="static" sx={{ backgroundColor: "#272727" }}>
      <Toolbar>
        <FormControl sx={{ m: 2, minWidth: 150 }}>
          <Select
            labelId="filter-label"
            id="filter"
            value=""
          >
            <MenuItem value=""> <em>Choose a Team</em></MenuItem>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="category1">Cloud 9</MenuItem>
            <MenuItem value="category2">FaZe Clan</MenuItem>
            <MenuItem value="category3">Sentinels</MenuItem>
          </Select>
        </FormControl>
        <Paper component="form" sx={{ ml: 2, display: "flex", alignItems: "center" }}>
          <Input
            sx={{ flex: 1, color: "black" }}
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
           
          />
          <IconButton
            color="inherit"
            aria-label="search"
            onClick={() => {}}
          >
            <Search />
          </IconButton>
        </Paper>
      </Toolbar>
    </AppBar>
    <main>
      <Container py={9}>
        <Grid container spacing={5}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} style={{marginTop:"20px"}}>
              <Card height="100%" display="flex" flexDirection="column" sx={{backgroundColor: '#61677A' }} >
                <CardMedia
                  component="img"
                  alt={product.title}
                  height="250"
                  image={product.image}
                />
                <CardContent flexGrow={1}>
                  <Typography variant="h5" gutterBottom textColor={"primary.100"} >
                    {product.title}
                  </Typography>
                  <Typography textColor={"primary.100"} >{product.description}</Typography>
                  <Typography variant="h6" style={{ marginTop: "10px" }} textColor={"primary.100"}>
                    {product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="md" variant="soft" color="primary">
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
        </Grid>
      </Container>
    </main>
  </Box>
);
  }
  
  export default Products;