// Importing necessary modules
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Creating an Express application
const app = express();

const prisma = new PrismaClient()

// Define a route
app.get('/parking', async (req, res) => {

  const parkings = await prisma.Parking.findMany();

  res.send(parkings);
});

// Starting the server
const port = 8080; 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
