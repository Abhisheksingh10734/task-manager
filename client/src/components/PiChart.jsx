import React from 'react';
import { useState } from 'react';

// Your task data — swap these with real values later
const total = 15;
const done = 5;
const pending = 7;
const high = 3;

const DonutChart = ({ done, pending, high, total }) => {
  const r = 60;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * r;

  const doneAngle = (done / total) * 360;
  const pendingAngle = (pending / total) * 360;
  const highAngle = (high / total) * 360;

  const toOffset = (start) => circumference - (start / 360) * circumference;
  const toRotate = (start) => `rotate(${start - 90} ${cx} ${cy})`;

  const doneStart = 0;
  const pendingStart = doneAngle;
  const highStart = doneAngle + pendingAngle;

  const pct = Math.round((done / total) * 100);

  return (
    <div className='relative w-[160px] h-[160px]'>
      <svg width="160" height="160" viewBox="0 0 160 160">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e1e40" strokeWidth="18" />

        {/* Done - green */}
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke="#22c55e" strokeWidth="18"
          strokeDasharray={`${(done / total) * circumference} ${circumference}`}
          strokeDashoffset={0}
          transform={toRotate(doneStart)}
          strokeLinecap="butt"
        />

        {/* Pending - yellow */}
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke="#f5a623" strokeWidth="18"
          strokeDasharray={`${(pending / total) * circumference} ${circumference}`}
          strokeDashoffset={0}
          transform={toRotate(pendingStart)}
          strokeLinecap="butt"
        />

        {/* High - red */}
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke="#ef4444" strokeWidth="18"
          strokeDasharray={`${(high / total) * circumference} ${circumference}`}
          strokeDashoffset={0}
          transform={toRotate(highStart)}
          strokeLinecap="butt"
        />
      </svg>

      {/* Center label */}
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <span className='text-2xl font-bold text-white'>{pct}%</span>
        <span className='text-[11px] text-[#888]'>completed</span>
      </div>
    </div>
  );
};

export const PiChart = () => {
  return (
    <>
    <div className='bg-[#2A243D] flex flex-col items-center gap-4 rounded-xl py-4 px-4'>

  <div className='w-full flex justify-between items-center'>
    <h2 className='text-xl font-bold tracking-wide text-white'>Progress Overview</h2>
    <span className='text-xs text-[#888] bg-[#1e1e40] px-3 py-1 rounded-full'>
      {total} tasks
    </span>
  </div>

  {/* 👇 Swap this div for a Power BI <iframe> later — nothing else needs to change */}
  <div className='chart-container'>
    <DonutChart done={done} pending={pending} high={high} total={total} />
  </div>

  <div className='flex justify-evenly w-full'>
    <div className='flex flex-col items-center gap-1'>
      <div className='flex items-center gap-2'>
        <div className='w-2 h-2 rounded-full bg-green-500' />
        <h4 className='text-sm text-[#ccc]'>Done</h4>
      </div>
      <span className='text-white font-bold text-sm'>{done}</span>
    </div>

    <div className='flex flex-col items-center gap-1'>
      <div className='flex items-center gap-2'>
        <div className='w-2 h-2 rounded-full bg-yellow-500' />
        <h4 className='text-sm text-[#ccc]'>Pending</h4>
      </div>
      <span className='text-white font-bold text-sm'>{pending}</span>
    </div>

    <div className='flex flex-col items-center gap-1'>
      <div className='flex items-center gap-2'>
        <div className='w-2 h-2 rounded-full bg-red-500' />
        <h4 className='text-sm text-[#ccc]'>High</h4>
      </div>
      <span className='text-white font-bold text-sm'>{high}</span>
    </div>
  </div>

</div>
    </>
  )
}
