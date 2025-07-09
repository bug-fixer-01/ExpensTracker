import React, {useState, useEffect } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const RecentIncomeWithChart = ({data,totalIncome}) => {

   const COLORS = ['#0088FE', '#00C49F','#9553c2','#7d8b11', '#FFBB28'];

    const [chartData,setChartData] = useState([])

    const prepareChartData = () =>{
        const dataArr = data.map((item)=>({
            name:item?.source,
            amount:item?.amount,
        }));

        setChartData(dataArr)
    }

    useEffect(()=>{
        prepareChartData()
    },[data])

  return (
    <div className="card">
        <div className="flex items-center justify-center">
            <h5 className='text-lg'>Last 60 Days Income</h5>
        </div>
        
         <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            showTextAnchor
            colors={COLORS}
         />
    </div>
  )
}

export default RecentIncomeWithChart