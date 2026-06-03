import React from 'react'

export const AccountBtn = ({text, type}) => {
  return (
    <button className='w-full border-1 px-4 py-2 font-bold text-xl hover:bg-gray-700 cursor-pointer text-center rounded-xl' type={type}>
        {text}
    </button>
  )
}
