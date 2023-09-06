import React from "react";
import { Box, Typography } from "@mui/joy";
const Footer = () => {

  return (
    <div className="footer">
    <Box p={6} mt={4} bgcolor="background.paper" component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        E-Sports Collections
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
       
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
      </Typography>
    </Box>
    
    </div>
  );
};
export default Footer;

