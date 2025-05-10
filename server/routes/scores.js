const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Get user's scores
router.get('/user', async (req, res) => {
  try {
    const scores = await Score.find({ user: req.user.id })
      .populate('quiz', 'title')
      .sort({ completedAt: -1 });
    res.json(scores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Submit quiz score
router.post('/', async (req, res) => {
  try {
    const { quizId, score, totalQuestions } = req.body;
    
    const newScore = new Score({
      user: req.user.id,
      quiz: quizId,
      score,
      totalQuestions
    });

    const savedScore = await newScore.save();
    res.json(savedScore);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get quiz leaderboard
router.get('/quiz/:quizId', async (req, res) => {
  try {
    const scores = await Score.find({ quiz: req.params.quizId })
      .populate('user', 'username')
      .sort({ score: -1 })
      .limit(10);
    res.json(scores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 