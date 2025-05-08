import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { restaurants } from '../data/restaurants';

const RestaurantList = ({ onSelect }) => (
  <Grid container spacing={2}>
    {restaurants.map((rest) => (
      <Grid item xs={12} sm={6} md={4} key={rest.id}>
        <Card onClick={() => onSelect(rest)} sx={{ cursor: 'pointer' }}>
          <CardMedia component="img" height="140" image={rest.image} alt={rest.name} />
          <CardContent>
            <Typography variant="h6">{rest.name}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default RestaurantList; 