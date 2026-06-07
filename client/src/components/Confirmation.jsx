import React from 'react'

export const Confirmation = ({setConfirmation, onDelete}) => {
  return (
    <>
    <div className="fixed inset-0 backdrop-blur-md bg-black/30 z-50">
                <div className='fixed bg-gray-400 text-black w-[70%] lg:w-[40%] h-[30%] rounded-xl flex items-center justify-center flex-col gap-8 p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
                <div>
                    <h3 className='font-bold text-xl'>Are you sure you want to delete this task?</h3>
                </div>
                <div className='flex gap-8 justify-evenly w-full'>
                    <button className='flex-1  bg-blue-400 hover:bg-blue-600 transition px-5 py-2 rounded-full font-bold text-sm cursor-pointer'
                    onClick={() => setConfirmation(false)}>No</button>
                    <button className='flex-1  bg-red-400 hover:bg-red-600 transition px-5 py-2 rounded-full font-bold text-sm cursor-pointer'
                    onClick={() => {onDelete()}}>Yes</button>
                </div>
            </div>
            </div>
    </>
  )
}
