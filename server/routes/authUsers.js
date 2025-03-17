const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

require('dotenv').config();


module.exports = router;
