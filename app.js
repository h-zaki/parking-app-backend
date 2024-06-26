// Importing necessary modules
const express = require('express');
const { PrismaClient } = require('@prisma/client');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');




// Creating an Express application
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const prisma = new PrismaClient()

// Middleware pour autoriser les requêtes cross-origin (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/images', express.static('Images'));


//get all parkings
app.get('/parking', async (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const longitude = parseInt(req.query.longitude);
  const latitude = parseInt(req.query.latitude);
  try{
    const parkings =  (longitude && latitude )?
    
    await prisma.$queryRaw`
        CALL get_closest_parks(${longitude}, ${latitude}, ${limit});
    `
    :
    await prisma.$queryRaw`
        CALL get_most_reserved_parks(${limit});
    `

    
    res.status(200).send(parkings.map(p => fields(p)));
  }
  catch(error) {
    console.log(error.message);
    res.status(500).send({"message": error.message})
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


// create reservation
app.post('/reservation', async (req, res) => {
  const { parking, arrivalTime,userId, duration } = req.body;
  parkId = parking.id
  const resTime = new Date(arrivalTime);
  try {
    
    const reservation = await prisma.reservation.create({
      data: {
        parkId,
        arrivalTime : resTime,
        duration,
        userId,
      }
    });
    res.status(201).json({ message: 'Reservation created', id: reservation.id});
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
});


app.put('/reservation', async (req,res)=>{
  const { id, duration } = req.body;

  try {
    
    const reservation = await prisma.reservation.update({
      data: {
        payee : true,
        duration: parseInt(duration),
      },
      where : { id: parseInt(id) }
    });
    res.status(201).json({ message: 'Reservation edited', id: reservation.id});
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
})

//get reservations
app.get('/reservation', async (req, res) => {
  try{
    const reservations = await prisma.reservation.findMany();

    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
});


app.delete('/reservation/:id', async (req, res) => {
  try{
    const id = parseInt(req.params.id);
    await prisma.reservation.delete({
      where: {
        id 
      }
    });

    res.status(200).json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
});

// Check if email exists
app.post('/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    const emailExists = !!existingUser;

    res.json({ exists: emailExists });
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});




// Endpoint d'inscription
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Endpoint de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  if (password !== user.password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, 'your-secret-key');
  res.json({ username:user.username, id : user.id_user, token });
});




const fields = (parking) =>
  {

    const switchedObj = 
    {
      id: parking.f0,
      name: parking.f1,
      city: parking.f2,
      price: parking.f3,
      img: parking.f4,
      latitude: parking.f5,
      longitude: parking.f6
    };
    return switchedObj;
  }




// Starting the server
const port = 8080; 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

