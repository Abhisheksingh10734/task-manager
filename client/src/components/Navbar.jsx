import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import notification_bell from "../assets/notification_bell.png";
import { getGreeting } from "../utils/greetings.js";

const navLinks = [
  { label: 'Dashboard', icon: '🏠', path: '/app/dashboard' },
  { label: 'Tasks',     icon: '📋', path: '/app/tasks'     },
  { label: 'Completed', icon: '✅', path: '/app/completed' },
  { label: 'Add Task',  icon: '➕', path: '/app/create-task'},
];

export const Navbar = ({ sectionName, username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const formattedUsername = username
    ?.split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ") || '';

  const logoName = username
    ?.trim()
    .split(" ")
    .slice(0, 2)
    .map(w => w.charAt(0).toUpperCase())
    .join("") || '';

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <div className='flex flex-col h-full'>

      {/* Logo */}
      <div className='flex items-center gap-3 px-5 pt-6 pb-4 border-b border-[#2a2a4a]'>
        <div className='w-8 h-8 bg-[#7c6ef0] rounded-lg flex items-center justify-center flex-shrink-0'>
          <span className='text-white font-bold text-sm'>✓</span>
        </div>
        <span className='text-white font-bold text-lg tracking-wide'>TaskFlow</span>
      </div>

      {/* User profile */}
      <div className='flex items-center gap-3 px-5 py-4 border-b border-[#2a2a4a]'>
        <div className='w-10 h-10 bg-[#7c6ef0] rounded-xl flex items-center justify-center flex-shrink-0'>
          <span className='text-sm font-bold text-white'>{logoName}</span>
        </div>
        <div>
          <p className='text-white font-bold text-sm'>{formattedUsername}</p>
          <p className='text-[#666] text-xs'>My Workspace</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className='flex flex-col gap-1 px-3 py-4 flex-1'>
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.path}
              onClick={() => handleNavigate(link.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer w-full text-left
                ${isActive
                  ? 'bg-[#7c6ef0] text-white'
                  : 'text-[#aaa] hover:bg-[#1e1e40] hover:text-white'
                }`}
            >
              <span className='text-base'>{link.icon}</span>
              {link.label}
              {isActive && <span className='ml-auto w-1.5 h-1.5 rounded-full bg-white' />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className='px-3 pb-6'>
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition w-full text-left cursor-pointer'
        >
          <span className='text-base'>🚪</span>
          Logout
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className='fixed top-0 left-0 right-0 z-30 flex justify-between items-center px-4 sm:px-6 py-4 bg-[#12122a] border-b border-[#2a2a4a]'>

        <div>
          <h2 className='text-xs text-[#888] font-semibold tracking-wide'>{getGreeting()}</h2>
          <h1 className='font-bold text-xl text-white'>{sectionName}</h1>
        </div>

        <div className='flex items-center gap-4'>

          {/* Notification bell */}
          <div className='relative cursor-pointer'>
            {/* <div className='bg-red-500 w-[18px] h-[18px] absolute -right-1 -top-1 rounded-full font-bold text-[10px] flex items-center justify-center text-white z-10'>
              12
            </div> */}
            <div className='w-9 h-9 rounded-xl bg-[#1e1e40] border border-[#2e2e5a] flex items-center justify-center hover:bg-[#2a2a50] transition'>
              <img src={notification_bell} alt="notifications" className='w-5' />
            </div>
          </div>

          {/* Avatar */}
          <div className='w-9 h-9 bg-[#7c6ef0] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#6a5cd8] transition'>
            <span className='text-sm font-bold text-white'>{logoName}</span>
          </div>

          {/* Hamburger */}
          <button
            type='button'
            onClick={() => setIsOpen(true)}
            className='w-9 h-9 bg-[#1e1e40] border border-[#2e2e5a] rounded-xl flex items-center justify-center active:scale-95 transition cursor-pointer'
          >
            <span className='text-white text-lg'>☰</span>
          </button>

        </div>
      </nav>

      {/* ── BACKDROP ── */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/60 z-40'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── DRAWER ── */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-[#12122a] border-r border-[#2a2a4a] z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className='absolute top-4 right-4 w-8 h-8 bg-[#1e1e40] rounded-lg flex items-center justify-center text-[#aaa] hover:text-white transition z-10 cursor-pointer'
        >
          ✕
        </button>
        <SidebarContent />
      </div>
    </>
  );
};