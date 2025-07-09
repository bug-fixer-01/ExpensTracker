const express = require('express');
const { addExpense, getAllExpense, deleteExpense, downloadExpense } = require('../controller/expense.Controller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.delete('/delete/:id', protect, deleteExpense);
router.get("/downloadexcel", protect, downloadExpense);
module.exports = router;