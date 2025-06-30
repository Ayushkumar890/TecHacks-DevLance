const express = require('express');
const { getGithubProfile, search, getTopDevs } = require('../controller/github');
const router = express.Router();


router.get(`/getGithubProfile`, getGithubProfile);
router.get(`/devlancer`, getGithubProfile);

router.get('/search/:username',search );
router.get("/topdevs", getTopDevs);


module.exports = router;
