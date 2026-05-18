const express = require('express');
const router = express.Router();
const { getAIRecommendations } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/recommend', protect, getAIRecommendations);

module.exports = router;
