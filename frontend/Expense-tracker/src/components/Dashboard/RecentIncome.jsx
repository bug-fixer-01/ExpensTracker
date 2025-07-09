import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'


const RecentIncome = ({transaction, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5>Income</h5>
            <button className='card-btn' onClick={onSeeMore}>
                 See All <LuArrowRight className='text-black' />
            </button>
        </div>


          <div>
                {transaction?.slice(0,5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date).format("MMM DD, YYYY")}
                        amount={item.amount}
                        type="income"
                        hideDeletebtn
                    />
                ))}
            </div>
    </div>
  )
}

export default RecentIncome