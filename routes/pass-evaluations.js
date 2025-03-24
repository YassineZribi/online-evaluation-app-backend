const express = require('express')

const { getPassEvaluation, updatePassEvaluation, getParticipantsResults, getParticipantResult } = require('../controllers/pass-evaluations');
const User = require('../models/User');
const checkAuth = require('../middlewares/check-auth');
const { authorizeRoles } = require('../middlewares/authorize-roles');

const router = express.Router()

router.get('/my/:userId/:evalId', checkAuth, getPassEvaluation)
router.get('/participants-results/:evalId', getParticipantsResults)
router.get('/participant-result/:evalId/:userId', getParticipantResult)
router.patch('/:passEvalId', checkAuth, authorizeRoles('participant'), updatePassEvaluation)

module.exports = router