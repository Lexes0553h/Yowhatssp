import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

function MagneticPill({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

const row1 = ["DISCOVER", "JOURNEY", "WANDER", "EXPLORE", "RE"];
const row2 = ["MOUNTAINS", "OCEANS", "CITIES", "ISLANDS"];
const row3 = ["LUXURY", "SANCTUARY", "UNSEEN", "ELITE"];
const row4 = ["ADVENTURE", "EXCELLENCE", "FUN", "MAGIC"];
const row5 = ["WONDER", "WORLDS", "DESTINATIONS", "TED"];
const row6 = ["GRANDEUR", "UNRIVALED", "SUPREME", "MAJESTIC"];
const row7 = ["VILLAS", "CHALETS", "RETREATS", "ESTATES"];
const row8 = ["OPULENCE", "SERENITY", "HARMONY", "MAJESTY"];
const row9 = ["HORIZONS", "DESTINIES", "DISCOVERIES", "SENSATIONS"];

function MarqueeRow({ 
  words, 
  fill = false, 
  direction = 1, 
  progress 
}: { 
  words: string[], 
  fill?: boolean, 
  direction?: number,
  progress: any 
}) {
  const content = [...words, ...words, ...words, ...words, ...words];
  
  // Slower, precise scroll speed for elegant motion
  const x = useTransform(
    progress,
    [0, 1],
    direction === 1 ? ["-6%", "1.5%"] : ["1.5%", "-6%"]
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-2 w-full">
      <motion.div 
        style={{ x, willChange: "transform" }}
        className="flex gap-6 md:gap-12 items-center w-max"
      >
        {content.map((word, i) => (
          <motion.span 
            key={i} 
            className={`font-sans text-3xl sm:text-5xl md:text-6xl lg:text-[5.6rem] font-bold tracking-tighter select-none cursor-pointer inline-block ${
              fill 
                ? "text-[#4d4d4d]" 
                : "text-transparent"
            }`}
            style={{
              ...( !fill ? { WebkitTextStroke: "1px rgba(255,255,255,0.18)" } : {}),
              willChange: "transform, color"
            }}
            whileHover={{ 
              scale: 1.06, 
              color: fill ? "#d4af37" : "rgba(255,255,255,0.15)",
              ...( !fill ? { WebkitTextStroke: "1px rgba(212,175,55,0.8)" } : {})
            }}
            transition={{ 
              type: "spring", 
              stiffness: 350, 
              damping: 25 
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 28,
    mass: 0.4,
    restDelta: 0.0001
  });

  return (
    <section 
      ref={containerRef}
      className="py-12 md:py-24 bg-black relative overflow-hidden flex flex-col gap-2 md:gap-4 font-sans z-10"
    >
      <MarqueeRow words={row1} progress={smoothProgress} direction={1} fill={false} />
      <MarqueeRow words={row2} progress={smoothProgress} direction={-1} fill={true} />
      <MarqueeRow words={row3} progress={smoothProgress} direction={1} fill={false} />
      <MarqueeRow words={row4} progress={smoothProgress} direction={-1} fill={true} />
      <MarqueeRow words={row5} progress={smoothProgress} direction={1} fill={false} />
      <MarqueeRow words={row6} progress={smoothProgress} direction={-1} fill={true} />
      <MarqueeRow words={row7} progress={smoothProgress} direction={1} fill={false} />
      <MarqueeRow words={row8} progress={smoothProgress} direction={-1} fill={true} />
      <MarqueeRow words={row9} progress={smoothProgress} direction={1} fill={false} />

      <motion.div className="absolute top-[15%] left-[20%] z-20"
        animate={{ y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <MagneticPill className="bg-[#D4AF37] text-black px-5 py-1.5 rounded-full font-bold text-[10px] md:text-xs tracking-widest rotate-[-15deg] shadow-lg">
          LUXURY
        </MagneticPill>
      </motion.div>

      <motion.div className="absolute top-[30%] right-[25%] z-20"
        animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
        <MagneticPill className="bg-[#2196F3] text-white px-5 py-1.5 rounded-full font-bold text-[10px] md:text-xs tracking-widest rotate-[10deg] shadow-lg">
          DISCOVER
        </MagneticPill>
      </motion.div>
      
      <motion.div className="absolute top-[45%] right-12 z-20"
        animate={{ y: [0, -15, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}>
        <MagneticPill className="bg-[#00BCD4] text-white px-5 py-1.5 rounded-full font-bold text-[10px] md:text-xs tracking-widest rotate-[25deg] shadow-lg">
          LEISURE
        </MagneticPill>
      </motion.div>

      <motion.div className="absolute bottom-[35%] left-12 z-20"
        animate={{ y: [0, 25, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <MagneticPill className="bg-[#E040FB] text-white px-5 py-1.5 rounded-full font-bold text-[10px] md:text-xs tracking-widest rotate-[-20deg] shadow-lg">
          FUN
        </MagneticPill>
      </motion.div>
      
      <motion.div className="absolute bottom-[20%] right-[35%] z-20"
        animate={{ y: [0, -20, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
        <MagneticPill className="bg-[#FF5722] text-white px-5 py-1.5 rounded-full font-bold text-[10px] md:text-xs tracking-widest rotate-[15deg] shadow-lg">
          MOMENTS
        </MagneticPill>
      </motion.div>

      <motion.div className="absolute bottom-[8%] right-[10%] z-20"
        animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}>
        <MagneticPill className="bg-[#651FFF] text-white px-5 py-1.5 rounded-full font-bold text-[10px] md:text-xs tracking-widest rotate-[-10deg] shadow-lg">
          WONDER
        </MagneticPill>
      </motion.div>
    </section>
  );
}
