const express = require('express');
const { postRegister, postLogin, verifyToken, logout } = require('../controller/usercontroller');
const router = express.Router();

router.post(`/postregister`, postRegister);
router.post(`/postlogin`, postLogin);
router.get(`/verify/:token`, verifyToken);
router.get(`/logout`, logout);



module.exports = router;
