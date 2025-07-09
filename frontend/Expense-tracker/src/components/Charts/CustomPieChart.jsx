import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
          <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].name}</p>
          <p className='text-sm text-gray-600'>
            Amount:<span className='text-sm font-medium text-gray-900'>${payload[0].value}</span></p>
        </div>
      )
    }
  }


  const CustomLegend = ({ payload }) => {
    return (
      <div className='flex flex-wrap items-center justify-center mt-4 space-x-6 '>
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className='flex items-center space-x-2'>
            <div className='w-3 h-3 rounded-full' style={{ backgroundColor: entry.color }}></div>
            <span className='text-xs text-gray-700 font-medium'>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div>
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend content={CustomLegend} />
          {showTextAnchor && (
            <g>
              <text
                x="50%"
                y="50%"
                dy={-25}
                textAnchor="middle"
                fill='#666'
                fontSize='14px'
              >
                {label} 
              </text>
              <text
                x="50%"
                y="50%"
                dy={8}
                textAnchor="middle"
                fill='#333'
                fontSize='24px'
                fontWeight='500'
              >
                {totalAmount}
              </text>
            </g>
          )}

        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart