const express = require('express');
const app = express();
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');

// Import Routes
const authRoute = require('./routes/auth');

dotenv.config();

// Connect Database
mongoose.connect( process.env.DB_CONNECT,
  { useUnifiedTopology: true , useNewUrlParser: true}, (err) =>{
    if(err)
    return console.log("Can not connect to the DataBase");
      console.log("Connected to DB!");
  });

// Middlewares
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);


app.listen(3000, function(){
  console.log("Server is Up and Running.");
});
