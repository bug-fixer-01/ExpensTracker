const Expense = require('../models/Expense.js');
const XLSX = require('xlsx');

exports.addExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(req.body)
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Server error" });
    }

};

exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ userId });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
    try {
        const expense = await Expense.findById(expenseId);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Server error" })
    }
}

exports.downloadExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await Expense.find({ userId });

        // Generate Excel file from expense data
        const excelData = expense.map(expense => ({
            category: expense.category,
            Amount: expense.amount,
            Date: expense.date,
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
        XLSX.writeFile(workbook, "expense_details.xlsx");
        res.download('expense_details.xlsx')
    } catch (error) {
        console.error("Error downloading expense:", error);
        res.status(500).json({ message: "Server error" });
    }
}