import React, { useState } from 'react';
import notification_bell from "../assets/notification_bell.png";

export const Navbar = ({ setIsOpen }) => {
    const [showNotifs, setShowNotifs] = useState(false);
  return (
    <>
    <nav className='w-full flex justify-between items-center fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#12122a] border-b border-[#2a2a4a] lg:left-64'>

  {/* Left — greeting */}
  <div>
    <h2 className='font-bold text-xs text-[#888] tracking-wide'>Good Morning 👋</h2>
    <h1 className='font-bold text-xl text-white'>Dashboard</h1>
  </div>

  {/* Right — icons */}
  <div className='flex items-center gap-4'>

    {/* Notification bell */}
    <div className='relative cursor-pointer' onClick={() => setShowNotifs(!showNotifs)}>
      <div className='bg-red-500 w-[18px] h-[18px] absolute -right-1 -top-1 rounded-full font-bold text-[10px] flex items-center justify-center text-white z-10'>
        12
      </div>
      <div className='w-9 h-9 rounded-xl bg-[#1e1e40] border border-[#2e2e5a] flex items-center justify-center hover:bg-[#2a2a50] transition'>
        <img src={notification_bell} alt="notifications" className='w-5' />
      </div>
    </div>

    {/* Avatar */}
    <div className='w-9 h-9 bg-[#7c6ef0] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#6a5cd8] transition'>
      <h2 className='text-sm font-bold text-white'>AS</h2>
    </div>

    <div className='flex items-center gap-3'>
        <button
          onClick={() => setIsOpen(true)}
          className='lg:hidden w-9 h-9 bg-[#1e1e40] border border-[#2e2e5a] rounded-xl flex items-center justify-center'
        >
          <span className='text-white text-lg'>☰</span>
        </button>
      </div>

  </div>
</nav>
    </>
  )
}
