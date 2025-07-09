import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper';
import { LuPlus } from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';

const IncomeOverview = ({ transaction, onAddIncome, checkIncome }) => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transaction)
    setChartData(result);

    return () => { }
  }, [transaction])

  return (
    <div className='card'>
      <div className='flex items-center justify-between p-3 rounded-lg'>
        <div className=''>
          <h5 className="text-lg">Income Overview</h5>
          <p className='text-sm text-gray-400 mt-0.5'>Track Your earnings over time and analyze your income </p>
        </div>
        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className='text-lg' />
          Add Income
        </button>
      </div>
      {!checkIncome && (
        <div className='mt-15'>
        <CustomBarChart data={chartData} />
        </div>)}
    </div>
  )
}

export default IncomeOverview