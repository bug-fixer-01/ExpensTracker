import React from 'react'
const Modal = ({ children, onClose, title }) => {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="relative w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg w-8 h-8 flex items-center justify-center"
            >
              X
            </button>
          </div>
          <div className="p-4 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};


export default Modal