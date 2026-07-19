import { useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion } from 'motion/react';

interface MagneticProps {
  children: ReactNode;
  strength?: number; // how much it follows the cursor
  snapRadius?: number; // max distance in px before it snaps back like a rubber band
  className?: string;
}

export default function Magnetic({ children, strength = 0.45, snapRadius = 110, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSnapped, setIsSnapped] = useState(false);
  const [isReleased, setIsReleased] = useState(true);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // If stretched past our elastic limit, snap back like a rubber band
    if (distance > snapRadius) {
      if (!isSnapped) {
        setIsSnapped(true);
        setIsReleased(true);
        setPosition({ x: 0, y: 0 });
      }
    } else {
      // Re-engage magnetic pull if the cursor comes back close to the center
      if (isSnapped && distance < snapRadius * 0.4) {
        setIsSnapped(false);
      }

      if (!isSnapped) {
        setIsReleased(false);
        setPosition({ x: dx * strength, y: dy * strength });
      }
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsSnapped(false);
    setIsReleased(true);
  };

  return (
    <div
      ref={ref}
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ padding: `${Math.round(snapRadius * 0.43)}px`, margin: `-${Math.round(snapRadius * 0.43)}px` }} // Invisible safety pad to capture cursor near the button
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        style={{ willChange: "transform" }}
        transition={{
          type: "spring",
          stiffness: isReleased ? 210 : 150, // Snappy real-world spring stiffness on release
          damping: isReleased ? 10 : 20,     // Underdamped on release (10) for natural bounce-and-shake, damped on pull (20) for clean tracking
          mass: isReleased ? 0.8 : 0.8       // Organic inertial mass for realistic momentum when it snaps back
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
