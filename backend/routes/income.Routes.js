const express = require('express');
const { addIncome, getAllIncome, deleteIncome, downloadIncome } = require('../controller/income.Controller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncome);
router.delete('/delete/:id', protect, deleteIncome);
router.get("/downloadexcel", protect, downloadIncome);
module.exports = router;