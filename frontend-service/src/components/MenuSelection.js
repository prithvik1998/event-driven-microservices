import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button, TextField } from '@mui/material';

const MenuSelection = ({ menu, selectedItems, setSelectedItems }) => {
  const handleQuantityChange = (itemId, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: parseInt(value, 10) || 0 } : item
      )
    );
  };

  React.useEffect(() => {
    setSelectedItems(menu.map((item) => ({ ...item, quantity: 0 })));
    // eslint-disable-next-line
  }, [menu]);

  return (
    <Grid container spacing={2}>
      {selectedItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Card>
            <CardMedia component="img" height="120" image={item.image} alt={item.name} />
            <CardContent>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
              <TextField
                label="Quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                inputProps={{ min: 0 }}
                sx={{ mt: 1, width: '100px' }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuSelection; 