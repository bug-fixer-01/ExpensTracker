import React from 'react'

const DeleteAlert = ({ content,onDelete}) => {
  return (
    <div className='flex justify-between '>
        <h5>{content}</h5>
        <button className='add-btn-fill add-btn mt-10' onClick={onDelete}>
            Delete
        </button>
    </div>
  )
}

export default DeleteAlert