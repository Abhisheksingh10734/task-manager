import { useEffect, useState } from "react";

export default function SignupLoader({ isLoading }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
    "Creating your account…",
    "Setting things up…",
    "Personalizing your workspace…",
    "Almost ready…",
];

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      setMsgIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 14 + 4;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        setMsgIndex(Math.min(Math.floor(next / 25), messages.length - 1));
        return next;
      });
    }, 320);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-zinc-950 gap-6">
      {/* Spinner */}
      <div className="w-10 h-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700 border-t-zinc-900 dark:border-t-white animate-spin" />

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-150 ease-out"
          style={{ width: `${Math.min(progress, 95)}%` }}
        />
      </div>

      {/* Status message */}
      <p className="text-sm text-zinc-400 dark:text-zinc-500 tracking-wide">
        {messages[msgIndex]}
      </p>
    </div>
  );
}