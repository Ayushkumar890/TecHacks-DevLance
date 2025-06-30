const express = require('express');
const { GithubVerify, verifyToken } = require('../middleware/verifytoken');
const router = express.Router();

router.get('/verify-token', verifyToken);
router.post('/githubverify', GithubVerify);

module.exports = router;
