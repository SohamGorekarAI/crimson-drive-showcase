import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Check if preloader has been shown before
    const hasSeenPreloader = localStorage.getItem('hasSeenPreloader');
    
    if (hasSeenPreloader) {
      onComplete();
      return;
    }

    // Animate progress from 0 to 100 over 3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            localStorage.setItem('hasSeenPreloader', 'true');
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
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="mx-auto"
              >
                <motion.path
                  d="M60 10 L95 30 L95 70 L60 90 L25 70 L25 30 Z"
                  fill="none"
                  stroke="hsl(var(--luxury-crimson))"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.text
                  x="60"
                  y="65"
                  textAnchor="middle"
                  className="fill-luxury-crimson font-bold text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  LUXURY
                </motion.text>
              </svg>
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