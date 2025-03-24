const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    type: { type: String, enum: ['radio', 'checkbox'], default: 'radio' },
    points: { type: Number, default: 1 },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
});

module.exports = mongoose.model('Question', questionSchema);
