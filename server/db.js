const mongoose = require('mongoose');
require('dotenv').config();

// Define the mongoDb connection URL

const mongoURL = process.env.mongoURL_LOCAL;
// replace mydatabase with your database name

// const mongoURLURL = mongodb+srv://proraahul3113:Raahulsaini3113@cluster0.batyvby.mongodb.net/proraahul3113

// set up mongodb connection
mongoose.connect(mongoURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});


// Mongoose maintain a default connection object representation the MongoDb connection
// get the default connection
const db = mongoose.connection;


// define the event listener for database connection
db.on('connected', ()=>{
    console.log('connected to MongoDb server');
});

db.on('error', (err)=>{
    console.log('error connecting to MongoDb server', err);
})

db.on('disconnected', ()=>{
    console.log('disconnected from MongoDb server');
})

// export the database connection
module.exports = db;