const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Quiz', quizSchema)