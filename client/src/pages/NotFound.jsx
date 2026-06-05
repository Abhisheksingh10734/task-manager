import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 3,
    }));
    setDots(generated);
  }, []);

  return (
    <div className="min-h-screen bg-[#12122a] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Floating dots background */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-[#7c6ef0] opacity-20 animate-pulse"
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            animationDelay: `${dot.delay}s`,
            animationDuration: `${dot.duration}s`,
          }}
        />
      ))}

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7c6ef0] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#7c6ef0] opacity-5 rounded-full blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 bg-[#1e1e40] border border-[#2e2e5a] rounded-2xl px-8 py-12 flex flex-col items-center text-center max-w-md w-full shadow-xl">

        {/* 404 big number */}
        <div className="relative mb-4">
          <h1 className="text-[96px] sm:text-[120px] font-black leading-none text-transparent bg-clip-text"
            style={{ WebkitTextStroke: '2px #7c6ef0', color: 'transparent' }}>
            404
          </h1>
          {/* Glowing underline */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#7c6ef0] rounded-full opacity-60" />
        </div>

        {/* Icon */}
        <div className="w-16 h-16 bg-[#2a2a50] border border-[#3a3a6a] rounded-2xl flex items-center justify-center mb-6 mt-4">
          <span className="text-3xl">🔍</span>
        </div>

        {/* Text */}
        <h2 className="text-white text-2xl font-bold tracking-wide mb-2">
          Page Not Found
        </h2>
        <p className="text-[#6a6a9a] text-sm leading-relaxed mb-8">
          Looks like this page went missing from your task list.
          It may have been moved, deleted, or never existed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => navigate('/app/dashboard')}
            className="flex-1 flex items-center justify-center gap-2 bg-[#7c6ef0] hover:bg-[#6a5cd8] active:scale-95 text-white font-bold py-3 px-6 rounded-xl transition-all duration-150 cursor-pointer"
          >
            <span>🏠</span> Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-[#2e2e5a] hover:bg-[#2a2a50] active:scale-95 text-[#aaa] hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-150 cursor-pointer"
          >
            <span>←</span> Go Back
          </button>
        </div>

        {/* Bottom hint */}
        <p className="text-[#3a3a6a] text-xs mt-6 tracking-wide">
          Lost? Head back to your dashboard to stay on track.
        </p>

      </div>
    </div>
  );
};

export default NotFound;