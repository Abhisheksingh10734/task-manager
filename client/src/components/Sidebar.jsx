import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
  { label: 'Tasks', icon: '📋', path: '/tasks' },
  { label: 'Completed', icon: '✅', path: '/completed' },
  { label: 'Settings', icon: '⚙️', path: '/settings' },
];

const Sidebar = ({ isOpen, setIsOpen, userName = 'Aryan Singh', userInitials = 'AS' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <div className='flex flex-col h-full'>

      {/* User profile */}
      <div className='flex items-center gap-3 px-5 py-6 border-b border-[#2a2a4a]'>
        <div className='w-10 h-10 bg-[#7c6ef0] rounded-xl flex items-center justify-center flex-shrink-0'>
          <span className='text-sm font-bold text-white'>{userInitials}</span>
        </div>
        <div>
          <p className='text-white font-bold text-sm'>{userName}</p>
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 w-full text-left
                ${isActive
                  ? 'bg-[#7c6ef0] text-white'
                  : 'text-[#aaa] hover:bg-[#1e1e40] hover:text-white'
                }`}
            >
              <span className='text-base'>{link.icon}</span>
              {link.label}
              {isActive && (
                <span className='ml-auto w-1.5 h-1.5 rounded-full bg-white' />
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className='px-3 pb-6'>
        <button
          onClick={() => navigate('/login')}
          className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition w-full text-left'
        >
          <span className='text-base'>🚪</span>
          Logout
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* ── MOBILE ── backdrop */}
      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/60 z-40'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── MOBILE ── slide-in drawer */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-[#12122a] border-r border-[#2a2a4a] z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className='absolute top-4 right-4 w-8 h-8 bg-[#1e1e40] rounded-lg flex items-center justify-center text-[#aaa] hover:text-white transition'
        >
          ✕
        </button>
        <SidebarContent />
      </div>

      {/* ── DESKTOP ── fixed left sidebar */}
      <div className='hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 bg-[#12122a] border-r border-[#2a2a4a] z-40'>
        <div className='flex items-center gap-3 px-5 pt-6 pb-4'>
          <div className='w-8 h-8 bg-[#7c6ef0] rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-sm'>✓</span>
          </div>
          <span className='text-white font-bold text-lg tracking-wide'>TaskFlow</span>
        </div>
        <SidebarContent />
      </div>

      {/* ── DESKTOP ── push page content right */}
      <div className='hidden lg:block w-64 flex-shrink-0' />
    </>
  );
};

export default Sidebar;