import React from 'react'
import { cardContent } from '../utils/dashboardCardsContent';
import { Navbar } from '../components/Navbar';
import { AddTaskBtn } from '../components/AddTaskBtn';
import { TaskInfoCard } from '../components/TaskInfoCard';
import { Searchbar } from '../components/Searchbar';
import { PiChart } from '../components/PiChart';

export const Dashboard = () => {
  return (
    <div className='inter-font px-4 py-2 flex flex-col gap-6'>

      <AddTaskBtn/>

      <Navbar />

      <div className='h-[72px]' />

      <Searchbar />

      <TaskInfoCard/>

      <PiChart />
    </div>
  )
}
