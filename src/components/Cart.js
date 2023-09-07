import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = ({ cart = [] }) => {
  // Initialize a state variable to keep track of which products are removed
  const [removedProducts, setRemovedProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState(
    cart.reduce((quantities, product) => {
      quantities[product.id] = 1; // Set initial quantity to 1 for all products
      return quantities;
    }, {})
  );
  const cloud9 = [{
    id: 2,
    name: "2023 Cloud9 Official Summer Jersey",
    description: "League of Legends Edition",
    price: 80,
    image:
      "https://store.cloud9.gg/cdn/shop/files/LOL_Front_400x.png?v=1685159158",
  }, {
    id: 3,
    name: "NAVI x PUMA 2023 Pro Kit",
    description: "Gameday Jersey",
    price: 50,
    image:
    "https://shop.navi.gg/files/resized/products/navi67131-2.400x400.png.webp",
  },];

  
  const mergedCart = [...cloud9, ...cart];

  
  const handleRemoveProduct = (productId) => {
    setRemovedProducts([...removedProducts, productId]);
  };
  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10) || 1;
    setProductQuantities({
      ...productQuantities,
      [productId]: quantity,
    });
  };

  
  const calculateTotal = (product) => {
    const quantity = productQuantities[product.id];
    return (quantity * product.price).toFixed(2);
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCartIcon fontSize="large" sx={{ marginRight: '8px' }} />
            Your Cart
          </Typography>
        </CardContent>
      </Card>

      <List>
        {mergedCart.map((product) => (
          !removedProducts.includes(product.id) && (
            <ListItem key={product.id} disablePadding sx={{ borderBottom: '1px solid #ddd' }}>
              <img src={product.image} alt={product.name} width="200" height="200" /> 
              <ListItemText
                primary={product.name}
                secondary={<span style={{ color: 'white' }}>$ {product.price}</span>}
                sx={{ flex: '1', color: 'white' }}
              />
              <TextField
                label="Quantity"
                type="number"
                value={productQuantities[product.id]}
                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                InputProps={{ inputProps: { min: 1 } }}
                sx={{ fontSize: '24px', color: 'white' }}
                
              />
              <Typography variant="body1" sx={{ flex: '1', textAlign: 'right', color: 'white' }}>
                Total: ${calculateTotal(product)}
              </Typography>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveProduct(product.id)}
                  sx={{ fontSize: '24px', color: 'white' }}

    
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        ))}
      </List>
    </div>
  );
};

export default Cart;