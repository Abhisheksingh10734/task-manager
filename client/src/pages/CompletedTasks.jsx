import React, { useState } from 'react';
import calendar from "../assets/calendar.png";
import { Searchbar } from '../components/Searchbar';
import { useNavigate } from 'react-router-dom';
import { Confirmation } from '../components/Confirmation';
import toast from 'react-hot-toast';
import { api } from '../api/axios';

export const CompletedTasks = ({
    completedTasks,
    setCompletedTasks
}) => {

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [searchValue, setSearchValue] = useState('');

    const priorityColors = {
        high: 'bg-red-700',
        medium: 'bg-yellow-600',
        low: 'bg-green-700',
    };

    const filteredTasks = completedTasks.filter(task =>
        task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        task.description.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleDeleteClick = (taskId) => {
        setSelectedTaskId(taskId);
        setIsConfirmOpen(true);
    };


    const confirmDelete = async () => {
        try {
            const res = await api.delete(
                `/app/tasks/delete/${selectedTaskId}`
            );

            const updatedTasks = completedTasks.filter(
                task => task.id !== selectedTaskId
            );

            setCompletedTasks(updatedTasks);

            setIsConfirmOpen(false);
            setSelectedTaskId(null);

            toast.success(res.data.message);

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        }
    };

    const completedTaskCount = completedTasks.length;

    return (
        <>
            {isConfirmOpen && (
                <Confirmation
                    setConfirmation={setIsConfirmOpen}
                    onDelete={confirmDelete}
                />
            )}

            <Searchbar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                disabled={completedTasks.length === 0}
            />

            {filteredTasks.length > 0 ? (<>
                {filteredTasks.map((item) => (<div
                    key={item.id}
                    className='bg-[#2A243D] px-4 py-4 rounded-xl flex flex-col gap-2 transition-transform duration-300 hover:scale-[1.02] mb-5'
                >
                    <div className='flex justify-between items-start gap-2'>
                        <div className='flex-1'>

                            <h2 className='font-bold text-base sm:text-xl text-gray-300'>
                                {item.title}
                            </h2>

                        </div>

                        <h3
                            className={`${priorityColors[item.priority] || 'bg-red-700'} px-3 py-1 rounded-full text-xs font-bold`}
                        >
                            {item.priority}
                        </h3>
                    </div>

                    <p className='text-neutral-400 text-sm leading-relaxed break-words'>
                        {item.description}
                    </p>

                    <div className='flex justify-between items-center mt-2'>

                        <div className='flex gap-2 items-center'>
                            <img
                                src={calendar}
                                alt="calendar"
                                className='w-4'
                            />

                            <h4 className='text-sm text-gray-400'>
                                {new Date(
                                    item.due_date
                                ).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    }
                                )}
                            </h4>
                        </div>

                        <button
                            className='bg-red-400 cursor-pointer hover:bg-red-600 transition px-5 py-2 rounded-full font-bold text-sm'
                            onClick={() =>
                                handleDeleteClick(item.id)
                            }
                        >
                            Delete
                        </button>

                    </div>
                </div>
                ))}
            </>
            ) : (
                <div className='w-full h-[74vh] flex items-center justify-center'>
                    <p className='text-2xl font-bold tracking-widest'>
                        {searchValue
                            ? "No matching completed tasks 🔍"
                            : "Oops! No tasks completed yet...😥"}
                    </p>
                </div>
            )}
        </>
    );
};