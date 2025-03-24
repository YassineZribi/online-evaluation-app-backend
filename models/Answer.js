const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  text: { type: String, default: '' },
  isValid: { type: Boolean, default: false },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }
});

module.exports = mongoose.model('Answer', answerSchema);
