const express = require('express');
const router = express.Router();

const { getAllCategories } = require('../../controllers/users/category');


router.get('/', getAllCategories);
module.exports = router;

