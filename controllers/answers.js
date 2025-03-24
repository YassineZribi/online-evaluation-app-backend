const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const createAnswer = async (req, res) => {
    try {
        const question = await Question.findById(req.params.qstId);

        if (!question) {
            return res.status(401).json({
                error: 'Question not found'
            });
        }

        // Create an answer and save it
        const newAnswer = new Answer();
        newAnswer.question = question._id;
        const answer = await newAnswer.save();

        question.answers.push(newAnswer._id)
        await question.save();
        
        // const answer = await Answer.findById(newAnswer._id).populate('answers');

        res.status(201).json({
            message: 'Answer created successfully',
            answer
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

const deleteAnswer = async (req, res) => {
    try {
        const answerId = req.params.ansId
        const deletedAnswer = await Answer.findByIdAndDelete(answerId)
        console.log(deletedAnswer)
        if (deletedAnswer) {
            const updatedQst = await Question.findByIdAndUpdate(deletedAnswer.question, { $pull: {answers: answerId}}, {new: true})
            console.log(updatedQst)
            res.json({message: "Answer deleted successfully"})
        } else {
            res.status(404).json({error: "Answer not found"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const setValidAnswer = async (req, res) => {
    try {
        const {qstId, ansId} = req.params
        const type = req.query.type;

        if (type === 'radio') {
            await Answer.updateMany({question: qstId}, {$set: {isValid: false}}, {new: true})
            await Answer.findByIdAndUpdate(ansId, { "$set": {isValid: true} }, {new: true})
        }
        else if (type === 'checkbox') {
            const answer = await Answer.findById(ansId)
            answer.isValid = !answer.isValid
            await answer.save()
        }
        res.json({message: "Valid answer updated successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const setAnswerText = async (req, res) => {
    try {
        const {ansId} = req.params

        await Answer.findByIdAndUpdate(ansId, { "$set": req.body }, {new: true})
        res.json({message: "Answer text updated successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createAnswer,
    deleteAnswer,
    setValidAnswer,
    setAnswerText
}