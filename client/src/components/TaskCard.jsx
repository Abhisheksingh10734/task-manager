import React, { useState } from 'react';
import calendar from "../assets/calendar.png";
import { Searchbar } from './Searchbar';
import { useNavigate } from 'react-router-dom';

export const TaskCard = ({ taskData, taskCount }) => {
    const navigate = useNavigate();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const priorityColors = {
        high: 'bg-red-700',
        medium: 'bg-yellow-600',
        low: 'bg-green-700',
    };

    return (
        <>
            <Searchbar />

            <div className='fixed bg-gray-400 text-black w-[70%] lg:w-[40%] h-[30%] rounded-xl flex items-center justify-center flex-col gap-8 p-6 top-4/12 left-4/12 z-1'>
                <div>
                    <h3 className='font-bold text-xl'>Are you sure want to delete ?</h3>
                </div>
                <div className='flex gap-8 justify-evenly w-full'>
                    <button className='flex-1  bg-blue-400 hover:bg-blue-600 transition px-5 py-2 rounded-full font-bold text-sm cursor-pointer'>No</button>
                    <button className='flex-1  bg-red-400 hover:bg-red-600 transition px-5 py-2 rounded-full font-bold text-sm cursor-pointer'>Yes</button>
                </div>
            </div>

            {taskCount > 0 ? (
                <>
                    {taskData.map((item, idx) => (
                        <div
                            key={item.id || idx}
                            className='bg-[#2A243D] px-4 py-4 rounded-xl flex flex-col gap-2 transition-transform duration-300 hover:scale-[1.02] mb-5'
                        >

                            {/* Row 1 */}
                            <div className='flex justify-between items-start gap-2'>
                                <div className='flex items-start gap-3 flex-1 min-w-0'>
                                    <input
                                        type="checkbox"
                                        className='w-5 h-5 cursor-pointer accent-green-600 mt-1 flex-shrink-0'
                                    />
                                    <h2 className='font-bold text-base sm:text-xl break-words w-full'>
                                        {item.title}
                                    </h2>
                                </div>

                                <h3
                                    className={`${priorityColors[item.priority] || 'bg-red-700'
                                        } px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 self-start`}
                                >
                                    {item.priority}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className='text-neutral-400 text-sm leading-relaxed break-words'>
                                {item.description}
                            </p>

                            {/* Date + buttons */}
                            <div className='flex flex-col xs:flex-row sm:flex-row justify-between items-start sm:items-center gap-3'>

                                <div className='flex gap-2 items-center'>
                                    <img
                                        src={calendar}
                                        alt="calendar icon"
                                        className='w-4 flex-shrink-0'
                                    />
                                    <h4 className='text-sm text-gray-400'>
                                        {new Date(item.due_date).toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                            }
                                        )}
                                    </h4>
                                </div>

                                <div className='flex gap-3 w-full sm:w-auto'>
                                    <button className='flex-1 sm:flex-none bg-blue-400 hover:bg-blue-600 transition px-5 py-2 rounded-full font-bold text-sm'
                                        onClick={() => navigate(`/app/tasks/${item.id}`)}>
                                        Edit
                                    </button>
                                    <button className='flex-1 sm:flex-none bg-red-400 hover:bg-red-600 transition px-5 py-2 rounded-full font-bold text-sm'
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className='w-full h-[74vh] flex items-center justify-center'>
                    <p className='text-2xl font-bold tracking-widest'>
                        Oops! No tasks found...🤭
                    </p>
                </div>
            )}
        </>
    )
};