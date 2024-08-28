const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json()); //get parsed data from frontend and save it to req.body
app.use(cors());
const PORT = process.env.PORT || 3000;


// import the router file
const userRoutes = require("./routes/userRoute");

// use the routers
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
