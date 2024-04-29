// Importing necessary modules
const express = require('express');
const { PrismaClient } = require('@prisma/client');

// Creating an Express application
const app = express();

const prisma = new PrismaClient()



app.use('/images', express.static('Images'));


//get all parkings
app.get('/parking', async (req, res) => {

  try{
    const parkings = await prisma.parking.findMany({
        select: {
          id: true,
          name: true,
          city: true,
          price: true,
          img: true,
        }
      });
    res.status(200).send(parkings);
  }
  catch {
    res.status(500).send({"message": "an error occured"})
  }

});





//get parking by id
app.get('/parking/:id', async (req, res) => {

  try{
    const id = parseInt(req.params.id);
    const parking = await prisma.parking.findUnique({
      where: {
        id 
      }
    });
    res.status(200).send(parking);
  }
  catch (error) {
    res.status(500).send({"message": error.message})
  }

});






// Starting the server
const port = 8080; 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
