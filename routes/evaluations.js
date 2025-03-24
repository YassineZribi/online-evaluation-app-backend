const express = require('express')

const { createEvaluation, getMyRelatedEvaluations, updateEvaluation, getEvaluation, getNotYetParticipants } = require('../controllers/evaluations');
const User = require('../models/User');
const checkAuth = require('../middlewares/check-auth');

const router = express.Router()

router.post('/:quizId', createEvaluation)
router.post('/participants/:evalId', getNotYetParticipants)
router.patch('/:evalId', updateEvaluation)
router.get('/:userId', getMyRelatedEvaluations) // for creator and participant
router.get('/one/:evalId', getEvaluation)

module.exports = router