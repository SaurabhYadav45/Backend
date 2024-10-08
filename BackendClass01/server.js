// step1 : Create folder
// step2 : Move into that folder
// step3 : npm init -y
// step4 : open folder using vs code
// step5 : npm i express
// step6 : create server.js

const express = require('express')
const app = express()

// Used to parse req.body in expressw -> PUT or POST
const bodyParser = require('body-parser');

// Specifically parse JSOn data and add it to the reqreq.body object
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started at port no. 3000")
});

// GET endpoints allow clients to retrieve data from the server
app.get('/', (req, res) => {
    res.send("hello ji kaise ho")
})

// POST endpoints allow clients to send data to the server. 
app.post('/api/cars', (req, res) =>{
    const{name, brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car submitted successfuly")
})

app.post('/', (req, res) =>{
    res.send('Got a POST request')
})

app.put('/', (req, res) => {
    res.send('Got a PUT request')
})

app.delete('/', (req, res) =>{
    res.send('Got a delete request')
})


                                        // Connect your Server to Database//

const mongoose = require('mongoose');
// Promise
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewurlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("Connection Successful")})
.catch(() => {console.log("Recieved an Error")});


// express.Router
// Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.