import React from 'react';
import add_task from "../assets/add_task.png";
import { useNavigate } from 'react-router-dom';

export const AddTaskBtn = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='border-2 border-purple-500/50 flex gap-2 py-4 px-6 rounded-xl cursor-pointer fixed bottom-8 right-4 bg-[#7c6ef0] hover:bg-[#6a5cd8] hover:border-purple-400 active:scale-95 transition-all duration-150 items-center shadow-lg shadow-purple-900/40 z-1' onClick={() => navigate('/app/create-task')}>
                <div className='w-7 h-7 bg-white/20 rounded-md flex items-center justify-center flex-shrink-0'>
                    <img src={add_task} alt="add task icon" className='w-4' />
                </div>
                <button className='cursor-pointer font-bold text-xl text-white tracking-wide'>Add Task</button>
            </div>
        </>
    )
}
