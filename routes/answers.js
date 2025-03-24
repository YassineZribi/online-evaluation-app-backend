const express = require('express')

const { createAnswer, deleteAnswer, setValidAnswer, setAnswerText } = require('../controllers/answers');
const User = require('../models/User');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router()

router.post('/:qstId', createAnswer)
router.delete('/:ansId', deleteAnswer)
router.patch('/:qstId/:ansId', setValidAnswer)
router.patch('/:ansId', setAnswerText)
// router.patch('/:qstId', updatePrimitiveFields)

module.exports = router