import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransaction = ({Render,transaction,onSeeMore}) => {
  return (
    <div className={`card ${Render}`}>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expanses</h5>
            <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-black' /></button>
        </div>
        <div className='mt-6'>
            {transaction?.slice(0, 5).map((expense) => (
                <TransactionInfoCard
                 key={expense._id}
                 title={expense.category}
                 icon={expense.icon}
                 date={moment(expense.date).format("MMM DD YYYY")}
                 amount={expense.amount}
                 type="expense"
                 hideDeletebtn
                />
            ))}

        </div>
    </div>
  )
}

export default ExpenseTransaction   