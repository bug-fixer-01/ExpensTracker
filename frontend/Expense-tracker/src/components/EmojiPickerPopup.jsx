import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { LuImage, LuX } from "react-icons/lu"

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  return ( 
      <div className='flex flex-row gap-4 cursor-pointer'>
        <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg' 
        onClick={() => setIsOpen(!isOpen)}>
          {icon ? (
            <img src={icon} alt='icon' className='w-12 h-12' />
          ) : (
            <LuImage />
          )}
        </div>
        <p>{icon ? "Change Icon" : "Pick Icon"}</p>

        {/* Position picker absolutely below this trigger */}
        {isOpen && (
          <div className='absolute mt-13 -ml-5 sm:ml-15g'>
            <div onClick={() => setIsOpen(false)}
              className='w-7 h-7 flex items-center justify-center bg-white border border-gray-300 rounded-lg absolute -right-2 -top-2 z-20 cursor-pointer'
            >
              <LuX />
            </div>
            <EmojiPicker
              onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
            />
          </div>
        )}
      </div>
  )
}

export default EmojiPickerPopup