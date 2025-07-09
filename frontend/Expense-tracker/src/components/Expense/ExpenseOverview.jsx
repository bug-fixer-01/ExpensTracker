import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transaction, onAddExpense, checkExpense }) => {
    console.log(transaction)

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transaction)
        setChartData(result)

        return () => { }
    }, [transaction])
    console.log(chartData)
    return (
        <div className='card'>
            <div className='flex items-center justify-between gap-3'>
                <div className=''>
                    <h5 className='text-lg'>Expense Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>Track your spending trends over time and gain insights into where you money goes</p>
                </div>
                <button className='add-btn' onClick={onAddExpense}>
                    <LuPlus className='' />
                    Add Expense
                </button>
            </div>
            {!checkExpense && (
                <div className='mt-15'>
                    <CustomLineChart data={chartData} />
                </div>)}

        </div>
    )
}

export default ExpenseOverview