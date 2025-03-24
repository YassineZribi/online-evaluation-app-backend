const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const createQuiz = async (req, res) => {
    try {
        const newQuiz = new Quiz();
        newQuiz.creator = req.params.creatorId;

        // Create a question
        const newQuestion = new Question();
        newQuestion.quiz = newQuiz._id;

        // Create an answer and save it
        const newAnswer = new Answer();
        newAnswer.question = newQuestion._id;
        await newAnswer.save();

        newQuestion.answers.push(newAnswer._id)
        await newQuestion.save();

        newQuiz.questions.push(newQuestion._id)
        await newQuiz.save();

        const createdQuiz = await Quiz.findById(newQuiz._id).populate({ path: 'questions', populate: { path: 'answers' } });

        res.status(201).json({
            message: 'Quiz created successfully',
            quiz: createdQuiz
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getQuiz = async (req, res) => {
    try {

        const quiz = await Quiz.findById(req.params.quizId).populate({ path: 'questions', populate: { path: 'answers' } });

        if (!quiz) {
            return res.status(401).json({
                error: 'Quiz not found'
            });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateQuiz = async (req, res) => {
    try {
        const { quizId } = req.params
        const quiz = await Quiz.findByIdAndUpdate(quizId, { "$set": req.body }, { new: true })
        res.status(200).json(quiz);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getCreatorQuizzes = async (req, res) => {
    try {
        const { creatorId } = req.params
        const quizzes = await Quiz.find({creator: creatorId}).populate({ path: 'questions', populate: { path: 'answers' } })
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = {
    createQuiz,
    getQuiz,
    updateQuiz,
    getCreatorQuizzes
}