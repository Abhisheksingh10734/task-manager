import React, { useEffect, useState } from 'react'
import { useParams, Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { AddTaskBtn } from '../components/AddTaskBtn'
import { Dashboard } from './Dashboard'
import { TaskCard } from '../components/TaskCard'
import { CompletedTasks } from './CompletedTasks'
import NotFound from './NotFound'
import CreateTask from './CreateTask'
import toast from 'react-hot-toast'
import { api } from '../api/axios'

export const DashboardPages = () => {
  const location = useLocation();
  const { section } = useParams();
  const [tasks, setTasks] = useState([]);
  const [totalTask, setTotalTask] = useState(0);

  const [username, setUserName] = useState("");

  const [pendingTasks, setPendingTasks] = useState([]);
  const [pendingTasksCount, setPendingTasksCount] = useState(0);

  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const [highPriorityTasks, setHighPriorityTasks] = useState([]);
  const [highPriorityTasksCount, setHighPriorityTasksCount] = useState(0);

  const title = section.charAt(0).toUpperCase() + section.slice(1);

  const showNav = ["dashboard", "tasks", "completed", "create-task"];

  const showAddTaskBtn = ["dashboard", "tasks", "completed"];

  const isNavVisible = showNav.includes(section);

  const isAddBtnVisible = showAddTaskBtn.includes(section);


  const fetchTasks = async () => {
    try {
      const res = await api.get("/app/tasks");

      setTasks(res.data.allTasks || []);
      setTotalTask(res.data.totalTaskCount || 0);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const fetchTaskStats = async () => {
    try {
      const res = await api.get("/app/stats");

      setPendingTasks(res.data.tasks.pending);
      setPendingTasksCount(res.data.counts.pendingTasks);

      setCompletedTasks(res.data.tasks.completed);
      setCompletedTasksCount(res.data.counts.completedTasks);

      setHighPriorityTasks(res.data.tasks.highPriority);
      setHighPriorityTasksCount(res.data.counts.highPriorityTasks);

      setUserName(res.data.username.name);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchTaskStats();
  }, [location]);

  return (
    <div className='inter-font bg-[#12122a] min-h-screen text-white'>

      {/* Navbar */}
      {isNavVisible && <Navbar sectionName={title} username={username} />}

      {/* Spacer so content doesn't hide under fixed navbar */}
      {isNavVisible && <div className='h-[72px]' />}

      {/* Page content */}
      <div className='px-4 sm:px-6 py-4 flex flex-col gap-4'>

        {section === "dashboard" ? (
          <Dashboard totalTaskCount={totalTask} highPriorityCount={highPriorityTasksCount} pendingCount={pendingTasksCount} completedCount={completedTasksCount} />
        ) : section === "tasks" ? (
          <TaskCard taskData={tasks} taskCount={totalTask} setTasks={setTasks} setTotalTask={setTotalTask} totalTask={totalTask} />
        ) : section === "completed" ? (
          <CompletedTasks completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks} />
        ) : section === "create-task" ? (
          <CreateTask />
        ) : (
          <NotFound />
        )}

        <Outlet />
      </div>

      {/* Add task button */}
      {/* {isAddBtnVisible && <AddTaskBtn />} */}

    </div>
  );
}
