import React from 'react'
import { TaskInfoCard } from '../components/TaskInfoCard';
import { PiChart } from '../components/PiChart';
import { Searchbar } from '../components/Searchbar';

export const Dashboard = (props) => {
  return (
    <>
      <Searchbar/>
      <TaskInfoCard totalTaskCount={props.totalTaskCount} highPriorityCount={props.highPriorityCount} pendingCount={props.pendingCount} completedCount={props.completedCount}/>
      <PiChart totalTaskCount={props.totalTaskCount} highPriorityCount={props.highPriorityCount} pendingCount={props.pendingCount} completedCount={props.completedCount}/>
    </>
  )
}
