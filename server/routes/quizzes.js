const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'username');
    res.json(quizzes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single quiz
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('createdBy', 'username');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create quiz
router.post('/', async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const newQuiz = new Quiz({
      title,
      description,
      questions,
      createdBy: req.user.id // This will come from auth middleware
    });

    const quiz = await newQuiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update quiz
router.put('/:id', async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    let quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if user owns the quiz
    if (quiz.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, description, questions },
      { new: true }
    );

    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete quiz
router.delete('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Check if user owns the quiz
    if (quiz.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await quiz.remove();
    res.json({ message: 'Quiz removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 