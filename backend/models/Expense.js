const mongoose = require('mongoose');
const User = require('./Users.js'); // Assuming Users.js is in the same directory

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String },
    category: { type: String, required: true }, // examples: 'Food', 'Transport', 'Entertainment'
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);