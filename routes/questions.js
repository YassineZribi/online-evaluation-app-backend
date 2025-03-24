const express = require('express')

const { createQuestion, deleteQuestion, updatePrimitiveFields } = require('../controllers/questions');
const User = require('../models/User');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router()

router.post('/:quizId', createQuestion)
router.delete('/:qstId', deleteQuestion)
router.patch('/:qstId', updatePrimitiveFields)
// router.get('/:quizId', getQuiz)

module.exports = router