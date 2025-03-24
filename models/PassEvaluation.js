const mongoose = require('mongoose')

const passEvaluationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    evaluation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evaluation'
    },
    responses: { type: mongoose.Schema.Types.Mixed, default: {}},
}, {minimize: false})

module.exports = mongoose.model('PassEvaluation', passEvaluationSchema)