const mongoose = require('mongoose')

const evaluationSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    questions: { type: mongoose.Schema.Types.Array, default: []},
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Evaluation', evaluationSchema)