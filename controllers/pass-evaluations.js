const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Evaluation = require('../models/Evaluation');
const PassEvaluation = require('../models/PassEvaluation');

const getPassEvaluation = async (req, res) => {
    // /:userId/:evalId
    const { userId, evalId } = req.params
    try {
        const passEvaluation = await PassEvaluation.findOne({ user: userId, evaluation: evalId }).populate('evaluation')
        if (passEvaluation)
            return res.status(200).json(passEvaluation);

        const evaluation = await Evaluation.findById(evalId);
        const newPassEvaluation = new PassEvaluation({
            user: userId,
            evaluation: evalId
        })
        evaluation.questions.forEach(q => {
            newPassEvaluation.responses[q._id.toString()] = []
        })
        await newPassEvaluation.save()
        const passEv = await PassEvaluation.findById(newPassEvaluation._id).populate('evaluation')
        res.status(200).json(passEv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updatePassEvaluation = async (req, res) => {
    try {
        const { passEvalId } = req.params
        const evaluation = await PassEvaluation.findByIdAndUpdate(passEvalId, { "$set": req.body }, { new: true })
        res.status(200).json(evaluation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getParticipantsResults = async (req, res) => {
    try {
        const { evalId } = req.params
        const evaluation = await Evaluation.findById(evalId).populate('participants');
        const passEvaluations = await PassEvaluation.find({evaluation: evalId});
        res.status(200).json({evaluation, passEvaluations});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getParticipantResult = async (req, res) => {
    try {
        const { evalId, userId } = req.params
        const passEvaluations = await PassEvaluation.findOne({evaluation: evalId, user: userId}).populate('evaluation user');
        res.status(200).json(passEvaluations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getPassEvaluation,
    updatePassEvaluation,
    getParticipantsResults,
    getParticipantResult
}