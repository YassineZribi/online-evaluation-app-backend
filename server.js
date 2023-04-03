const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Loads .env file contents into process.env.
dotenv.config()

// Creates an Express application
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to Home page !')
})

mongoose.connect(process.env.DATABASE)
        .then(() => {
            console.log('Successfully connected to DB')
            app.listen(process.env.PORT, () => {
                console.log(`Server is listening on port ${process.env.PORT}`)
            })
        })
        .catch((err) => {
            console.log(err)
        })