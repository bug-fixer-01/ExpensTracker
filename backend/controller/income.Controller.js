const Income = require('../models/Income.js');
const XLSX = require('xlsx');   


exports.addIncome = async (req, res) => {
    try {
        const userId = req.user._id;
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Server error" });
    }

};

exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const incomes = await Income.find({ userId });
        res.status(200).json(incomes);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteIncome = async (req, res) => {
    const incomeId = req.params.id;
    try {
        const income = await Income.findById(incomeId);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        await Income.findByIdAndDelete(incomeId);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "server error",error});
    }
}

exports.downloadIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        // Generate Excel file from incomes data
        const excelData = incomes.map(income => ({
            Source: income.source,
            Amount: income.amount,
            Date: income.date,
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
        XLSX.writeFile(workbook, "income_details.xlsx");
        res.download('income_details.xlsx')
        
    } catch (error) {
        console.error("Error downloading income:", error);
        res.status(500).json({ message: "Server error" });
    }
}