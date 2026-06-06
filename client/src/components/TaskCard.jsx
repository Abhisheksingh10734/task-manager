import React, { useState } from 'react';
import calendar from "../assets/calendar.png";
import { Searchbar } from './Searchbar';
import { useNavigate } from 'react-router-dom';
import { Confirmation } from './Confirmation';
import { api } from '../api/axios';
import toast from 'react-hot-toast';

export const TaskCard = ({ taskData, taskCount, setTasks, setTotalTask }) => {
    const navigate = useNavigate();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const priorityColors = {
        high: 'bg-red-700',
        medium: 'bg-yellow-600',
        low: 'bg-green-700',
    };

    const handleDeleteClick = (taskId) => {
        setSelectedTaskId(taskId);
        setIsConfirmOpen(true);
    }

    const confirmDelete = async () => {
        try {
            const res = await api.delete(
                `/app/tasks/delete/${selectedTaskId}`
            );

            const updatedTasks = taskData.filter(
                task => task.id !== selectedTaskId
            );

            setTasks(updatedTasks);
            setTotalTask(updatedTasks.length);

            setIsConfirmOpen(false);
            setSelectedTaskId(null);

            toast.success(res.data.message);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const handleTaskStatus = async (taskID) => {
        try {
            const res = await api.patch(
                `/app/tasks/status/${taskID}`
            );

            setTasks(prev =>
                prev.map(task =>
                    task.id === taskID
                        ? {
                            ...task,
                            task_status: "completed"
                        }
                        : task
                )
            );

            toast.success(
                res.data.message || "Task completed"
            );

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const filteredTasks = taskData.filter(task =>
        task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        task.description.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>

            {isConfirmOpen && < Confirmation setConfirmation={setIsConfirmOpen} onDelete={confirmDelete} />}

            <Searchbar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                disabled={taskData.length === 0}
            />

            {filteredTasks.length > 0 ? (<>
                {filteredTasks.map((item, idx) => (<div
                    key={item.id || idx}
                    className='bg-[#2A243D] px-4 py-4 rounded-xl flex flex-col gap-2 transition-transform duration-300 hover:scale-[1.02] mb-5'
                >

                    {/* Row 1 */}
                    <div className='flex justify-between items-start gap-2'>
                        <div className='flex items-start gap-3 flex-1 min-w-0'>
                            <input
                                type="checkbox"
                                checked={item.task_status === "completed"}
                                disabled={item.task_status === "completed"}
                                onChange={() => handleTaskStatus(item.id)}
                                className='w-5 h-5 cursor-pointer accent-green-600 mt-1 flex-shrink-0 disabled:cursor-not-allowed'
                            />
                            <h2
                                className={`font-bold text-base sm:text-xl break-words w-full
                                                ${item.task_status === "completed"
                                        ? "line-through text-gray-500"
                                        : ""
                                    }`}
                            >
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
                            <button className='flex-1 sm:flex-none bg-blue-400 hover:bg-blue-600 transition px-5 py-2 rounded-full font-bold text-sm cursor-pointer'
                                onClick={() => navigate(`/app/tasks/${item.id}`)}>
                                Edit
                            </button>
                            <button className='flex-1 sm:flex-none bg-red-400 hover:bg-red-600 transition px-5 py-2 rounded-full font-bold text-sm cursor-pointer'
                                onClick={() => handleDeleteClick(item.id)}
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
                        {searchValue
                            ? "No matching tasks found 🔍"
                            : "Oops! No tasks found...🤭"}
                    </p>                     </div>
            )}
        </>
    )
};