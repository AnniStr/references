// Leah
const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);

//Neue Route für authentifizierten User
router.post('/authenticate', ctrlUser.authenticate);

//Private Route für User Profile mit hilfe des JSON Web Tokens
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;



