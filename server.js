const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');

const usersRoutes = require('./routes/auth')
const quizzesRoutes = require('./routes/quizzes')
const questionsRoutes = require('./routes/questions')
const answersRoutes = require('./routes/answers')
const evaluationsRoutes = require('./routes/evaluations')
const passEvaluationsRoutes = require('./routes/pass-evaluations')

// Loads .env file contents into process.env.
dotenv.config()

// Creates an Express application
const app = express()

app.use(cors({ credentials: true, origin: [ "http://localhost:5173" ] }));
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Home page !')
})


// routes
app.use('/api/auth', usersRoutes)
app.use('/api/quizzes', quizzesRoutes)
app.use('/api/questions', questionsRoutes)
app.use('/api/answers', answersRoutes)
app.use('/api/evaluations', evaluationsRoutes)
app.use('/api/pass-evaluations', passEvaluationsRoutes)

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