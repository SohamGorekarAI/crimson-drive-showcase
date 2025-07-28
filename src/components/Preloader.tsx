import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Fixed 3-second loading animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 200);
          return 100;
        }
        return newProgress;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black"
        >
          <div className="text-center">
            {/* Ferrari Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8 relative"
            >
              <div className="relative mx-auto w-32 h-32">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-luxury-crimson/20 rounded-full blur-xl scale-110" />
                
                {/* Ferrari Shield */}
                <svg
                  width="128"
                  height="128"
                  viewBox="0 0 128 128"
                  className="mx-auto relative z-10 drop-shadow-2xl"
                >
                  {/* Shield background with gradient */}
                  <defs>
                    <linearGradient id="ferrariGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--luxury-crimson))" />
                      <stop offset="50%" stopColor="#DC143C" />
                      <stop offset="100%" stopColor="#8B0000" />
                    </linearGradient>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#FFA500" />
                      <stop offset="100%" stopColor="#FF8C00" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Shield shape */}
                  <motion.path
                    d="M64 8 L20 28 L20 68 C20 88 64 120 64 120 C64 120 108 88 108 68 L108 28 Z"
                    fill="url(#ferrariGradient)"
                    stroke="url(#goldGradient)"
                    strokeWidth="2"
                    filter="url(#glow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  
                  {/* Ferrari Prancing Horse */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    <path
                      d="M50 45 C52 42 58 40 62 42 C66 40 70 42 72 45 C74 48 72 52 70 54 C68 56 62 58 64 62 C66 66 70 68 72 72 C70 74 66 74 62 72 C58 74 54 74 52 72 C54 68 58 66 60 62 C62 58 56 56 54 54 C52 52 50 48 50 45 Z"
                      fill="url(#goldGradient)"
                      stroke="#000"
                      strokeWidth="0.5"
                    />
                    {/* Horse details */}
                    <circle cx="58" cy="48" r="1.5" fill="#000" />
                    <path d="M56 52 Q58 54 60 52" stroke="#000" strokeWidth="0.5" fill="none" />
                  </motion.g>
                  
                  {/* Ferrari text */}
                  <motion.text
                    x="64"
                    y="95"
                    textAnchor="middle"
                    className="fill-gold font-bold text-sm tracking-wider"
                    style={{ fontFamily: 'serif' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                  >
                    FERRARI
                  </motion.text>
                </svg>
                
                {/* Animated light rays */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gradient-to-t from-luxury-crimson/50 to-transparent transform -translate-x-1/2" />
                  <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-gradient-to-b from-luxury-crimson/50 to-transparent transform -translate-x-1/2" />
                  <div className="absolute left-0 top-1/2 h-0.5 w-8 bg-gradient-to-l from-luxury-crimson/50 to-transparent transform -translate-y-1/2" />
                  <div className="absolute right-0 top-1/2 h-0.5 w-8 bg-gradient-to-r from-luxury-crimson/50 to-transparent transform -translate-y-1/2" />
                </motion.div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-luxury-light-gray text-sm font-medium">
                  Loading Experience
                </span>
                <span className="text-luxury-crimson text-sm font-bold">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-1 bg-luxury-dark-gray rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-crimson rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-luxury-light-gray/60 text-sm mt-6 tracking-wide"
            >
              Crafting Automotive Excellence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;