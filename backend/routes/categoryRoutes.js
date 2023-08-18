const express = require('express');
const { newCategory, getCategories } = require('../controllers/categoryController');
const router = express.Router();



router.route('/category/new').post(newCategory);
router.route('/category/getAll').get(getCategories);


module.exports = router;