const express = require('express')

const { createQuiz, getQuiz, updateQuiz, getCreatorQuizzes } = require('../controllers/quizzes');
const User = require('../models/User');
const checkAuth = require('../middlewares/check-auth');
const { authorizeRoles } = require('../middlewares/authorize-roles');


const router = express.Router()

router.post('/:creatorId', createQuiz)
router.get('/:creatorId', checkAuth, authorizeRoles('creator'), getCreatorQuizzes)
router.get('/quiz/:quizId', getQuiz)
router.patch('/:quizId', updateQuiz)

module.exports = router