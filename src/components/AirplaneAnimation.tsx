import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

interface AirplaneAnimationProps {
  loading: boolean;
  setPlannerOpen: (open: boolean) => void;
  setSelectedDestId: (id: string | undefined) => void;
  children?: React.ReactNode;
}

const AirplaneAnimation = forwardRef<HTMLDivElement, AirplaneAnimationProps>(
  ({ setPlannerOpen, setSelectedDestId, children }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isRevealed, setIsRevealed] = useState(false);
    const [timeString, setTimeString] = useState('00:00:00');

    // Video URLs (CloudFront CDN as requested)
    const originalVideoUrls = [
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4',
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4',
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4'
    ];

    const [videoUrls, setVideoUrls] = useState<string[]>(originalVideoUrls);

    // Preloading videos as blobs for seamless, zero-latency transitions
    useEffect(() => {
      const controller = new AbortController();
      const loadedUrls = [...originalVideoUrls];

      const preload = async () => {
        try {
          await Promise.all(
            originalVideoUrls.map(async (url, idx) => {
              try {
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) throw new Error('Fetch failed');
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                loadedUrls[idx] = objectUrl;
              } catch (e) {
                // Ignore AbortError, fallback to original CDN URLs on network block
                if ((e as Error).name !== 'AbortError') {
                  console.warn(`Video prefetch failed for idx ${idx}, using CDN URL`, e);
                }
              }
            })
          );
          setVideoUrls(loadedUrls);
        } catch (globalErr) {
          console.warn('Global video preloading fallback triggered', globalErr);
        }
      };

      preload();

      return () => {
        controller.abort();
        loadedUrls.forEach((url) => {
          if (url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        });
      };
    }, []);

    // Live clock showing London / CUP London / Cuban Peso timezone format
    useEffect(() => {
      const updateClock = () => {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setTimeString(formatter.format(now));
      };

      updateClock();
      const interval = setInterval(updateClock, 1000);
      return () => clearInterval(interval);
    }, []);

    // Auto-switch background videos every 8 seconds for a stunning dynamic display
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % originalVideoUrls.length);
      }, 8000);
      return () => clearInterval(interval);
    }, []);

    // IntersectionObserver for reveal once at 0.35 threshold
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 } // Trigger slightly earlier for great feel
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    const handleSwitchVideo = (idx: number) => {
      setActiveIndex(idx);
    };

    return (
      <div 
        ref={ref}
        id="about-section"
        className="relative w-full bg-black text-white font-figtree overflow-hidden select-none"
      >
        {/* Custom CSS styles matching all prompt-mandated animation states */}
        <style>{`
          @keyframes dotPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.45; transform: scale(1.45); }
          }
          .animate-dot-pulse {
            animation: dotPulse 1.6s infinite ease-in-out;
          }
          .ease-spring {
            transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          }
          .role-link {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          }
          .role-link:hover {
            transform: translateX(6px);
          }
          .nav-link-underline {
            position: relative;
          }
          .nav-link-underline::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: white;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .nav-link-underline:hover::after {
            transform: scaleX(1);
            transform-origin: left;
          }
          .btn-fill-up {
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.55);
            transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .btn-fill-up::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #F598F2;
            transform: translateY(101%);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 0;
          }
          .btn-fill-up:hover::before {
            transform: translateY(0);
          }
          .btn-fill-up:hover {
            color: black;
            border-color: #F598F2;
          }
          .btn-fill-up > span {
            position: relative;
            z-index: 1;
          }

          /* Reveal Animations */
          .reveal-up-anim {
            opacity: 0;
            transform: translateY(80px);
            will-change: transform, opacity;
            transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .reveal-up-anim.revealed {
            opacity: 1;
            transform: translateY(0);
          }

          .reveal-right-anim {
            opacity: 0;
            transform: translateX(100px);
            will-change: transform, opacity;
            transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .reveal-right-anim.revealed {
            opacity: 1;
            transform: translateX(0);
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-delay: 0s !important;
              animation-duration: 0s !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0s !important;
              scroll-behavior: auto !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Cinematic Section Container */}
        <section 
          ref={sectionRef}
          className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between"
        >
          {/* ================= LOOPING BACKGROUND VIDEOS STACKED & CROSSFADING ================= */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
            {videoUrls.map((url, idx) => (
              <video
                key={url}
                src={url}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                  activeIndex === idx ? 'opacity-100 z-1' : 'opacity-0 z-0'
                }`}
              />
            ))}
            {/* Elegant overlay to maintain contrast */}
            <div className="absolute inset-0 bg-black/35 z-[2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/55 z-[2] pointer-events-none" />
          </div>

          {/* ================= HERO CONTENT (ABOVE THE FOOTER) ================= */}
          <main className="relative z-[2] max-w-[1340px] w-full mx-auto flex-1 flex flex-col justify-end py-12 md:py-20 px-6 sm:px-[15px] gap-12 md:gap-16">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-end">
              
              {/* Left Column: Big Brand Display */}
              <div className="lg:col-span-7 space-y-4">
                <h2 
                  className={`reveal-up-anim font-serif uppercase tracking-[0.05em] font-black leading-none select-none text-[38px] sm:text-[54px] md:text-[72px] lg:text-[84px] xl:text-[96px] ${
                    isRevealed ? 'revealed' : ''
                  }`}
                >
                  TOURALUXE
                  <span 
                    className="transition-colors duration-1000 font-sans"
                    style={{ color: activeIndex === 0 ? '#F598F2' : '#ffffff' }}
                  >
                    .
                  </span>
                </h2>
                
                <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/50 leading-relaxed">
                  The Art of Curated Journeys & Private Travel Design
                </p>
              </div>

              {/* Right Column: Narrative of what we do */}
              <div className="lg:col-span-5 space-y-6 lg:pl-4 border-l border-white/10 pl-0 lg:pl-8">
                <p 
                  className={`reveal-right-anim text-white/80 text-sm sm:text-base leading-relaxed tracking-wide font-light ${
                    isRevealed ? 'revealed' : ''
                  }`}
                >
                  We design fully bespoke itineraries, luxury stays, and seamless global adventures tailored entirely to your imagination. From hidden tropical sanctuaries to exclusive cultural expeditions, Touraluxe handles every detail so you can focus purely on making beautiful life memories.
                </p>

                {/* Minimalist highlights list */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.15em] text-white/60">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#F598F2]" />
                    Curated Itineraries
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#F598F2]" />
                    Luxury Stays
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#F598F2]" />
                    Seamless Transfers
                  </span>
                </div>
              </div>

            </div>

          </main>
        </section>

        {/* ================= NATURAL DOM FOOTER RENDER ================= */}
        <div className="relative z-30 w-full bg-black">
          {children}
        </div>
      </div>
    );
  }
);

AirplaneAnimation.displayName = 'AirplaneAnimation';

export default AirplaneAnimation;
