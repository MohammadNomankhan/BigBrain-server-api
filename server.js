// All imports

const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const Clarifai = require('clarifai');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'nomanstwt',
    password : 'ChuSup@321',
    database : 'smart-brain'
  }
});

// imports from controller
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// middlewares
app.use(express.json());
app.use(cors())


// Root
app.get('/', (req, res) => {
	res.json("sucess");
})

// Sign in
app.post('/signin', (req, res) => { signin.handleSignin(req,res,knex,bcrypt)})

// Register
app.post('/register', (req, res) => {register.handleRegister(req,res,knex,bcrypt)})

// profile/:if
app.get('/profile/:id', (req ,res) => {profile.profileGet(req,res,knex)})

// image
app.put('/image', (req,res) => {image.imagePut(req,res,knex)})

// Image-Api-Call
app.post('/imageUrl', (req,res) => {image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3000, () => {
	console.log(`runnig bro, on ${process.env.PORT}`)
})

