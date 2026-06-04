// In your Layout.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {Navbar} from '../components/Navbar';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // ← state lives here

  return (
    <div className='flex min-h-screen bg-[#12122a] text-white'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className='flex-1 min-w-0 lg:ml-64'>
        <Navbar setIsOpen={setIsOpen} /> {/* ← pass it down */}
        <div className='px-4 py-4'>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;