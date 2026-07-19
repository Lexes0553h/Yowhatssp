import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
  onStartExit?: () => void;
}

export default function LoadingScreen({ onComplete, onStartExit }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    // Premium loading simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShouldExit(true);
            if (onStartExit) {
              onStartExit();
            }
          }, 450); // Slightly faster exit initiation
          return 100;
        }
        // Elegant non-linear loading increment
        const increment = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onStartExit]);

  const logoText = "TOURALUXE";
  const letters = logoText.split("");

  const titleContainerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.04,
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: 1,
      }
    }
  };

  const letterVariants = {
    initial: { 
      y: 40, 
      opacity: 0 
    },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as any 
      } 
    },
    exit: { 
      y: -60, 
      opacity: 0,
      transition: { 
        duration: 0.55, 
        ease: [0.76, 0, 0.24, 1] as any 
      } 
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!shouldExit && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 bg-[#000000] z-50 flex flex-col items-center justify-center select-none"
          initial={{ y: 0, opacity: 1 }}
          exit={{ 
            y: '-100%',
            opacity: 0,
            transition: { 
              duration: 0.95, 
              ease: [0.85, 0, 0.15, 1] as any // Ultra-refined custom bezier for a sweeping, majestic slide fade
            } 
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Main Brand Logo */}
          <motion.div 
            className="flex flex-col items-center text-center px-4"
            exit={{
              y: -50,
              opacity: 0,
              transition: { duration: 0.7, ease: [0.85, 0, 0.15, 1] as any }
            }}
          >
            <motion.h1
              id="loading-logo"
              className="text-white text-3xl sm:text-5xl md:text-6xl font-display font-medium mb-4 uppercase flex justify-center items-center"
              variants={titleContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block select-none"
                  style={{ 
                    marginRight: index === letters.length - 1 ? '0' : '0.22em',
                    willChange: "transform, opacity"
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Elegant Divider Line */}
            <motion.div
              id="loading-divider"
              className="h-[1px] bg-white/30 my-4"
              style={{ width: '150px', transformOrigin: 'left', willChange: "transform" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            />

            {/* Subtitle / Promise */}
            <motion.p
              id="loading-subtitle"
              className="text-neutral-400 text-[10px] md:text-xs font-sans font-light tracking-[0.4em] uppercase mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            >
              AUTHENTIC EXCELLENCE — {progress}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
