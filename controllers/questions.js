const User = require('../models/User');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const createQuestion = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);

        if (!quiz) {
            return res.status(401).json({
                error: 'Quiz not found'
            });
        }
        // console.log(req.body)
        const newQuestion = new Question(req.body);

        // If is a duplication
        if (Object.keys(req.body).length > 0) {
            await newQuestion.save();
            newQuestion.answers = []
            for (response of req.body.answers) {
                const resCopy = {...response}
                delete resCopy._id
                const newAnswer = new Answer(resCopy);
                newAnswer.question = newQuestion._id;
                await newAnswer.save();
                newQuestion.answers.push(newAnswer._id)
            }
            await newQuestion.save();
            // console.log(newQuestion)
        } else { // // If is a new creation
            newQuestion.quiz = quiz._id;
            
            // Create an answer and save it
            const newAnswer = new Answer();
            newAnswer.question = newQuestion._id;
            await newAnswer.save();
    
            newQuestion.answers.push(newAnswer._id)
            await newQuestion.save();
    
        }

        quiz.questions.splice(Number(req.query.at), 0, newQuestion._id)
        await quiz.save();
        
        const question = await Question.findById(newQuestion._id).populate('answers');

        res.status(201).json({
            message: 'Question created successfully',
            question
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
}

const deleteQuestion = async (req, res) => {
    try {
        const QstToDeleteId = req.params.qstId
        const rslt = await Answer.deleteMany({question: QstToDeleteId})
        // console.log(rslt.deletedCount)
        const deletedQst = await Question.findByIdAndDelete(QstToDeleteId)

        if (deletedQst) {
            const updatedQuiz = await Quiz.findByIdAndUpdate(deletedQst.quiz, { $pull: {questions: QstToDeleteId}}, {new: true})
            // console.log(updatedQuiz)
            res.json({message: "Question deleted successfully"})
        } else {
            res.status(404).json({error: "Question not found"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updatePrimitiveFields = async (req, res) => {
    try {
        const {qstId} = req.params
      if (req.body.type) {
          await Answer.updateMany({question: qstId}, {$set: {isValid: false}}, {new: true})
      }
      const question = await Question.findByIdAndUpdate(qstId, { "$set": req.body }, {new: true}).populate('answers')
      res.status(200).json(question);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }


module.exports = {
    createQuestion,
    deleteQuestion,
    updatePrimitiveFields
}