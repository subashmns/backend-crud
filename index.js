const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const productRoute = require("./routes/product.route");

app.use(express.json()); // to parse json data in request body
app.use(express.urlencoded({ extended: false })); //}))

//routes
app.use("/api/products", productRoute);

mongoose
  .connect(
    "mongodb+srv://subashebanezer:subash@backenddb.8f0up.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000 thanks");
    });
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });
