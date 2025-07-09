import React from 'react'
import  {getInitials}  from '../../utils/helper'

const CharAvatar = ({fullName,width,height,style}) => {
  return (
    <div className={`${width || "w-12"} ${height || "h-12"} rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-medium ${style || ""}`}>
        {getInitials(fullName || "")}
    </div>
  )
}

export default CharAvatar