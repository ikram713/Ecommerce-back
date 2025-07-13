const express = require('express');
const router = express.Router();
const { likeProduct, getUserLikes } = require('../controllers/likeController');
const auth = require('../middleware/authMiddleware'); // assuming you have this

router.post('/like', auth, likeProduct);
router.get('/like', auth, getUserLikes);

// 

module.exports = router;
