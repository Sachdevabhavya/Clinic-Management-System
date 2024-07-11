const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer"); // If handling file uploads

const user_router = require("./routes/user_login_routes");
const doctor_router = require("./routes/doctor_login_routes");
const appointment_router = require("./routes/appointment_booking_routes");
const order_router = require("./routes/order_medicine_routes");

const app = express();
require("dotenv").config();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use('/api', user_router);
app.use('/api', doctor_router);
app.use('/api', appointment_router);
app.use('/api', order_router);

const PORT = 6000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.Mongo_URL)
    .then(() => {
        console.log("Connected to database successfully");
    })
    .catch((err) => {
        console.error("Failed to connect to the database", err);
    });
