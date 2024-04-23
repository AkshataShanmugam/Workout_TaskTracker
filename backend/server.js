const express = require("express");
require('dotenv').config()

//workout routes are imported here
const workoutRoutes = require("./routes/workouts")
const mongoose = require('mongoose')

// express app
const app = express()

// global middleware
app.use(express.json()); // passes to request object
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

// routes
app.use("/api/workouts/", workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })