import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollSequence = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !containerRef.current) return;

    const frames = [
      "ezgif-frame-010.jpg", "ezgif-frame-011.jpg", "ezgif-frame-012.jpg", "ezgif-frame-022.jpg", "ezgif-frame-027.jpg",
      "ezgif-frame-028.jpg", "ezgif-frame-029.jpg", "ezgif-frame-030.jpg", "ezgif-frame-031.jpg", "ezgif-frame-032.jpg",
      "ezgif-frame-033.jpg", "ezgif-frame-034.jpg", "ezgif-frame-039.jpg", "ezgif-frame-040.jpg", "ezgif-frame-041.jpg",
      "ezgif-frame-042.jpg", "ezgif-frame-043.jpg", "ezgif-frame-044.jpg", "ezgif-frame-045.jpg", "ezgif-frame-046.jpg",
      "ezgif-frame-054.jpg", "ezgif-frame-055.jpg", "ezgif-frame-056.jpg", "ezgif-frame-057.jpg", "ezgif-frame-058.jpg",
      "ezgif-frame-066.jpg", "ezgif-frame-067.jpg", "ezgif-frame-081.jpg", "ezgif-frame-092.jpg", "ezgif-frame-093.jpg",
      "ezgif-frame-094.jpg", "ezgif-frame-095.jpg", "ezgif-frame-096.jpg", "ezgif-frame-100.jpg", "ezgif-frame-101.jpg",
      "ezgif-frame-102.jpg", "ezgif-frame-105.jpg", "ezgif-frame-111.jpg", "ezgif-frame-112.jpg", "ezgif-frame-113.jpg",
      "ezgif-frame-114.jpg", "ezgif-frame-119.jpg", "ezgif-frame-120.jpg", "ezgif-frame-121.jpg", "ezgif-frame-122.jpg",
      "ezgif-frame-123.jpg", "ezgif-frame-124.jpg", "ezgif-frame-125.jpg", "ezgif-frame-126.jpg", "ezgif-frame-134.jpg",
      "ezgif-frame-135.jpg", "ezgif-frame-144.jpg", "ezgif-frame-145.jpg", "ezgif-frame-146.jpg", "ezgif-frame-147.jpg",
      "ezgif-frame-148.jpg", "ezgif-frame-149.jpg", "ezgif-frame-150.jpg", "ezgif-frame-151.jpg", "ezgif-frame-152.jpg",
      "ezgif-frame-156.jpg"
    ];
    
    const frameCount = frames.length;
    const currentFrame = (index: number) => `/fl/${frames[index]}`;

    const images: HTMLImageElement[] = [];
    const sequence = { frame: 0 };

    // Preload all images seamlessly
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      // Round to perfectly snap to real array indices and prevent empty frames
      const frameIndex = Math.round(sequence.frame);
      const img = images[frameIndex];
      
      if (img && img.complete) {
        // Draw image covering the canvas completely (object-fit: cover equivalent)
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    };

    // Load first frame immediately
    images[0].onload = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    // Responsive handling
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', handleResize);

    // Scroll trigger for sequence linking scroll to frame
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%', // Enough scroll distance to smoothly cover the images
        pin: true,
        scrub: 0.5, // 0.5 for nice responsive scrub smoothing
      },
    });

    tl.to(sequence, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
    </section>
  );
};

export default ScrollSequence;
