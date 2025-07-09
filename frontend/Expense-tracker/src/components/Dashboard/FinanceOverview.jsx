import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';
import { MdWorkHistory } from "react-icons/md";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];


const FinanceOverview = ({ totalBalance, totalIncome, totalExpense, negativeBalance }) => {
    // console.log(totalBalance)
    const balanceData = [{
        name: 'Total Balance',
        amount: totalBalance,
    }, {
        name: 'Total Income',
        amount: totalIncome,
    }, {
        name: 'Total Expense',
        amount: totalExpense,
    }]
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>
            </div>

            {negativeBalance ? 
            <div className='flex flex-col items-center justify-center h-60 gap-4'>
                <h5 className='text-xl'>You have a debt off</h5>
                <h1 className='text-2xl bg-red-50 text-red-600 rounded-md px-3 py-1.5 '>${totalBalance}</h1>

                <h5 className='flex items-center gap-5'>BRO YOU ARE BROKE , GET A JOB <MdWorkHistory className='text-xl' /></h5>
            </div> :
                <CustomPieChart
                    data={balanceData}
                    label="Total Balance"
                    totalAmount={`$${totalBalance}`}
                    colors={COLORS}
                    showTextAnchor
                />}

        </div>
    )
}

export default FinanceOverview 