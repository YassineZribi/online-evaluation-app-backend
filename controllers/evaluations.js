const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Evaluation = require('../models/Evaluation');

const createEvaluation = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId).populate({ path: 'questions', populate: { path: 'answers' } });

        if (!quiz) {
            return res.status(401).json({
                error: 'Quiz not found'
            });
        }
        console.log(quiz.toObject())
        const newEvaluation = new Evaluation({
            title: quiz.title,
            description: quiz.description,
            questions: quiz.toObject().questions,
            creator: quiz.creator
        });
        newEvaluation.save()

        res.status(201).json(newEvaluation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getMyRelatedEvaluations = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(401).json({
                error: 'Wrong email and/or password'
            });
        }

        const evaluations = user.role === 'creator'
                            ? await Evaluation.find({creator: req.params.userId}).select('-questions')
                            : await Evaluation.find({participants: req.params.userId}).select('-questions')

        res.status(200).json(evaluations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEvaluation = async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.evalId).select('-questions').populate('participants');

        res.status(200).json(evaluation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateEvaluation = async (req, res) => {
    try {
        const {evalId} = req.params
      const evaluation = await Evaluation.findByIdAndUpdate(evalId, { "$set": req.body }, {new: true}).populate('participants')
      res.status(200).json(evaluation);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  const getNotYetParticipants = async (req, res) => {
    // evalId
    const evaluation = await Evaluation.findById(req.params.evalId);

    if (!evaluation) {
        return res.status(401).json({
            error: 'Evaluation not found'
        });
    }
    
    try {
        // _id: { $nin: evaluation.participants},
        const users = await User.find({ email: { "$regex": req.body.value, "$options": "i" }, role: "participant" }).select('-password')
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createEvaluation,
    getMyRelatedEvaluations,
    getEvaluation,
    updateEvaluation,
    getNotYetParticipants
}