const express = require('express');
const { register, login, logout, updateProfile } = require('../controllers/userController');
const isAuthenticated = require('../middleware/authMiddleware');
const singleUpload = require('../middleware/multer');

const router = express.Router();

router.route('/register').post(singleUpload, register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').post(isAuthenticated, singleUpload, updateProfile);

module.exports = router;
