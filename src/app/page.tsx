"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Upload, Video, Star, Target, Zap, Clock, Users, ShieldAlert, Award, FileText, Check, ArrowUpRight } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredTheme, setHoveredTheme] = useState<number | null>(null);
  
  // Typewriter effect state
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const words = ["Your Story.", "Your Vision.", "Your Voice.", "Your Canvas."];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      // Speed up deleting, keep typing speed normal
      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        // Pause at the end of word before deleting
        timer = setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        // Move to next word after fully deleted
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(handleType, 500);
      } else {
        // Continue typing or deleting
        timer = setTimeout(handleType, typingSpeed);
      }
    };
    
    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white text-[#1a1512] font-sans selection:bg-[#C4532B] selection:text-white">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] pt-16 pb-20 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-[#FAF9F6]">
        {/* Background Sketch Image */}
        <div
          className="absolute inset-0 z-0 opacity-80 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: "url('/bg-india.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        ></div>
        {/* Soft bottom gradient to blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FAF9F6] to-transparent z-0"></div>

        <div className="max-w-[1000px] w-full mx-auto flex flex-col items-center text-center relative z-10 mt-8">
          <motion.div 
            variants={fadeIn} 
            className="group inline-flex items-center gap-2.5 rounded-full bg-white/50 backdrop-blur-md border border-white/40 px-5 py-2 text-sm font-medium tracking-wide mb-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:bg-white/80 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] hover:border-white/80 transition-all duration-500 cursor-default"
          >
            <span className="text-[#3A5F45] text-lg leading-none mt-[-2px]">✦</span>
            <span className="text-[#1A1A1A]/80">Independence Day Edition</span>
          </motion.div>

          <motion.h1
            variants={fadeIn}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#1A1A1A] mb-8 flex flex-wrap justify-center gap-x-4 gap-y-2"
          >
            <span>Your Reel.</span>
            <span className="text-[#3A5F45] italic font-light">Your India.</span>
            <span className="inline-block text-[#C4532B] text-center">
              {text}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-[3px] h-[1em] bg-[#C4532B] ml-1 align-middle -mt-2"
              />
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl md:text-2xl font-light text-[#1A1A1A]/70 max-w-2xl mb-12 leading-relaxed">
            A national movement empowering the next generation to voice their vision for the country. Join thousands of creators across India.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6 items-center">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfBa2SEnZuHNhiLX8olq3PEfrgh7aFNVmgUpHuPJFRnJ_adng/viewform" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center p-1.5 pr-8 rounded-full bg-[#FAF9F6] border border-[#1A1A1A]/15 text-[#1A1A1A] hover:border-transparent overflow-hidden transition-all duration-500 shadow-[0_8px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(255,153,51,0.25)] hover:-translate-y-1">
              
              {/* Expanding Circle Background (Indian Flag) */}
              <span className="absolute left-1.5 top-1.5 w-12 h-12 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-[15] origin-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"></span>
              
              {/* Initial Dark Circle */}
              <span className="absolute left-1.5 top-1.5 w-12 h-12 rounded-full bg-[#1A1A1A] group-hover:scale-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"></span>

              {/* Icon Container */}
              <span className="relative flex items-center justify-center w-12 h-12 rounded-full text-white group-hover:text-[#1A1A1A] transition-colors duration-500 z-10">
                <Video className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
              </span>
              
              {/* Text */}
              <span className="relative ml-4 sm:ml-5 font-semibold tracking-[0.2em] uppercase text-[12px] sm:text-[13px] opacity-90 z-10 group-hover:text-[#1A1A1A] transition-colors duration-500">Registration Form</span>
            </a>
          </motion.div>


        </div>
      </section>

      {/* Minimal Marquee Ribbon */}
      <div className="bg-[#FAF9F6] text-[#1A1A1A]/60 py-3 border-y border-[#1A1A1A]/10 overflow-hidden whitespace-nowrap text-sm font-medium tracking-widest uppercase relative z-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="inline-block"
        >
          <span className="mx-6">✦ CELEBRATING INDEPENDENCE DAY</span>
          <span className="mx-6">✦ CALLING ALL CREATORS</span>
          <span className="mx-6">✦ GET OFFICIALLY FEATURED</span>
          <span className="mx-6">✦ NATIONWIDE SHOWCASE</span>
          <span className="mx-6">✦ CELEBRATING INDEPENDENCE DAY</span>
          <span className="mx-6">✦ CALLING ALL CREATORS</span>
          <span className="mx-6">✦ GET OFFICIALLY FEATURED</span>
          <span className="mx-6">✦ NATIONWIDE SHOWCASE</span>
        </motion.div>
      </div>

      {/* About Section - Interactive Feature Tabs (SaaS Style) */}
      <section id="about" className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
        
        {/* Background Editorial Watermark & Subheading */}
        <div className="absolute top-2 md:top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none whitespace-nowrap z-0">
          <div className="pt-[20px] text-[15vw] md:text-[13vw] font-heading font-bold text-[#1A1A1A]/10 tracking-tighter leading-[0.8]">
            THEMES
          </div>
          <div 
            className="text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.2em] opacity-50 flex flex-wrap justify-center items-center gap-x-3 uppercase mt-[5px]"
            style={{ fontFamily: "'Formula Condensed', sans-serif" }}
          >
            <span className="text-[#1A1A1A]">ONE REEL,</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#C4532B] to-[#138808] italic">ONE STORY</span>
          </div>
          {/* Faded Divider */}
          <div className="w-[200px] md:w-[350px] h-[1.5px] bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] opacity-50 mt-3 rounded-full"></div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          
          {/* Spacer for Watermark */}
          <div className="pt-16 md:pt-24 mb-10"></div>

          {/* Horizontal List Layout */}
          <div className="flex flex-col w-full border-t border-black/10 relative mt-4">
            {[
              { 
                title: "SALUTE TO OUR ARMED FORCES", 
                tags: ["Tribute", "Security", "Everyday Heroes"],
                color: "group-hover:text-[#FF9933]",
                bgAccent: "bg-[#FF9933]",
                gradient: "from-[#FF9933]/80 via-[#FF9933]/20 to-transparent",
                icon: <ShieldAlert className="w-20 h-20 text-white" />,
                image: "/salute.jpg"
              },
              { 
                title: "78 YEARS OF INDEPENDENCE", 
                tags: ["Journey", "Vision", "Future"],
                color: "group-hover:text-[#138808]",
                bgAccent: "bg-[#138808]",
                gradient: "from-[#138808]/80 via-[#138808]/20 to-transparent",
                icon: <Star className="w-20 h-20 text-white" />,
                image: "/78-years.jpg"
              },
              { 
                title: "CIVIC DUTIES", 
                tags: ["Citizenship", "Responsibility", "Stronger India"],
                color: "group-hover:text-[#000080]",
                bgAccent: "bg-[#000080]",
                gradient: "from-[#000080]/80 via-[#000080]/20 to-transparent",
                icon: <CheckCircle2 className="w-20 h-20 text-white" />,
                image: "/civic-duties.jpg"
              },
              { 
                title: "ROLE OF GEN Z IN DEVELOPED INDIA", 
                tags: ["Innovation", "Culture", "Progress"],
                color: "group-hover:text-[#1A1A1A]",
                bgAccent: "bg-[#1A1A1A]",
                gradient: "from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent",
                icon: <Zap className="w-20 h-20 text-white" />,
                image: "/genz-india.jpg"
              },
              { 
                title: "SUPER HEROES OF OUR SOCIETY", 
                tags: ["Service", "Community", "Champions"],
                color: "group-hover:text-[#C4532B]",
                bgAccent: "bg-[#C4532B]",
                gradient: "from-[#C4532B]/80 via-[#C4532B]/20 to-transparent",
                icon: <Users className="w-20 h-20 text-white" />,
                image: "/superheroes.jpg"
              }
            ].map((theme, i) => (
              <div 
                key={i}
                onMouseEnter={() => setHoveredTheme(i)}
                onMouseLeave={() => setHoveredTheme(null)}
                className="group relative flex flex-col py-10 md:py-16 border-b border-black/10 cursor-pointer"
              >
                {/* Title and Arrow */}
                <div className="flex justify-between items-center z-10 w-full">
                  <h3 
                    className={`text-3xl md:text-4xl lg:text-[3.5rem] uppercase transition-colors duration-500 text-[#1A1A1A]/60 ${theme.color} leading-[0.95] tracking-normal`}
                    style={{ 
                      fontFamily: "'Formula Condensed', Impact, sans-serif",
                      fontWeight: 300,
                      WebkitFontSmoothing: "antialiased",
                      MozOsxFontSmoothing: "grayscale"
                    }}
                  >
                    {theme.title}
                  </h3>
                  <div className={`opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out ${theme.color}`}>
                    <ArrowUpRight className="w-10 h-10 md:w-16 md:h-16 stroke-[1.5]" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-8 z-10">
                  {theme.tags.map((tag, j) => {
                    const tagStyles = [
                      "bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/30", // Saffron
                      "bg-white text-[#000080] border-[#000080]/30",        // White & Ashoka Chakra Blue
                      "bg-[#138808]/10 text-[#138808] border-[#138808]/30"  // Green
                    ];
                    return (
                      <span 
                        key={j} 
                        className={`px-3 py-1 text-xs md:text-sm font-serif font-normal rounded-none border transition-colors duration-300 ${tagStyles[j % tagStyles.length]} group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-transparent`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Floating Image (Glassmorphism Card) */}
                <AnimatePresence>
                  {hoveredTheme === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10, x: 100, y: '-50%' }}
                      animate={{ opacity: 1, scale: 1, rotate: 6, x: 0, y: '-50%' }}
                      exit={{ opacity: 0, scale: 0.8, rotate: -10, x: 100, y: '-50%' }}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                      className="absolute right-0 lg:right-[5%] top-1/2 pointer-events-none z-20 hidden md:block"
                    >
                      <div className="relative w-[300px] h-[220px] lg:w-[450px] lg:h-[320px] rounded-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 z-30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={theme.image || "https://placehold.co/600x400"} 
                          alt={theme.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Grid */}
      <section id="why" className="py-24 px-6 md:px-12 bg-[#FAF9F6] relative overflow-hidden border-t border-[#1A1A1A]/5">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#1A1A1A] mb-6">
              Why Participate
            </h2>
            <p className="text-lg font-light text-[#1A1A1A]/60 max-w-2xl mx-auto">More than just a competition, it's a platform to amplify your voice and reach millions.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                icon: <Video className="w-5 h-5" />, 
                title: "Showcase your craft", 
                points: ["Tell your story your way", "In your language & style", "Choose your own format"],
                theme: "#FF9933"
              },
              { 
                icon: <Users className="w-5 h-5" />, 
                title: "Reach a wider audience", 
                points: ["Cross-promotion on official handles", "Reach millions across India", "Gain nationwide visibility"],
                theme: "#138808"
              },
              { 
                icon: <Star className="w-5 h-5" />, 
                title: "Get officially featured", 
                points: ["Shortlisted reels are celebrated", "Shared on official channels", "Official recognition"],
                theme: "#000080"
              },
              { 
                icon: <Award className="w-5 h-5" />, 
                title: "Win cash prizes", 
                points: ["₹51,000 total prize pool", "Rewards for top entries", "Financial support for creators"],
                theme: "#FF9933"
              },
              { 
                icon: <FileText className="w-5 h-5" />, 
                title: "Earn a certificate", 
                points: ["Participation certificate for all", "Formal letter of recognition", "Special mentions for top creators"],
                theme: "#138808"
              },
              { 
                icon: <Target className="w-5 h-5" />, 
                title: "Join a growing network", 
                points: ["Connect with young creators", "Be part of a nationwide story", "Build your creative network"],
                theme: "#000080"
              }
            ].map((card, i) => (
              <div 
                key={i} 
                className={`transition-transform duration-500 ${i % 2 === 1 ? 'md:translate-y-8' : ''} ${i % 3 === 1 ? 'lg:translate-y-12' : 'lg:translate-y-0'}`}
              >
                <motion.div variants={fadeIn} className="relative h-full bg-white rounded-[32px] p-8 md:p-10 hover:-translate-y-3 transition-all duration-500 overflow-hidden group shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-[#1A1A1A]/[0.03]">
                  
                  {/* Subtle Background Radial Glow on Hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${card.theme}, transparent 70%)` }}
                  ></div>

                  {/* Animated Bottom Border */}
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-0 group-hover:w-full transition-all duration-700 ease-out"
                    style={{ backgroundColor: card.theme }}
                  ></div>

                  {/* Subtle Background Pattern (Abstract rings) */}
                  <svg width="150" height="150" viewBox="0 0 150 150" className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-1000 ease-out">
                    <circle cx="75" cy="75" r="50" fill="none" stroke="#1A1A1A" strokeWidth="2" />
                    <circle cx="75" cy="75" r="70" fill="none" stroke="#1A1A1A" strokeWidth="1" />
                    <circle cx="75" cy="75" r="30" fill="none" stroke="#1A1A1A" strokeWidth="0.5" strokeDasharray="4 4" />
                  </svg>

                  {/* Animated Icon Box */}
                  <div className="relative w-14 h-14 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-8 overflow-hidden group-hover:shadow-lg transition-shadow duration-500 z-10"
                       style={{ '--theme-color': card.theme } as React.CSSProperties}>
                    {/* Fill animation */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-150 rounded-full transition-all duration-700 ease-out"
                      style={{ backgroundColor: card.theme }}
                    ></div>
                    {/* Icon */}
                    <div className="relative z-10 text-[var(--theme-color)] group-hover:text-white transition-colors duration-500">
                      {card.icon}
                    </div>
                  </div>
                  
                  {/* Title with Gradient Reveal */}
                  <h3 className="text-[22px] font-bold text-[#1A1A1A] group-hover:text-transparent bg-clip-text mb-4 relative z-10 tracking-tight leading-tight pr-4 transition-colors duration-500"
                      style={{ backgroundImage: `linear-gradient(90deg, #1A1A1A, ${card.theme})` }}>
                    {card.title}
                  </h3>
                  
                  {/* Sweeping Themed Line */}
                  <div 
                    className="h-[3px] w-12 group-hover:w-full rounded-full mb-8 relative z-10 opacity-80 transition-all duration-700 ease-out"
                    style={{ background: `linear-gradient(90deg, ${card.theme}, transparent)` }}
                  ></div>
                  
                  {/* Bullet Points with Staggered Arrow Slide */}
                  <ul className="space-y-4 relative z-10">
                    {card.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="mt-[3px] transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" style={{ transitionDelay: `${j * 75}ms` }}>
                          <ArrowRight 
                            className="w-[14px] h-[14px] flex-shrink-0" 
                            style={{ color: card.theme }} 
                          />
                        </div>
                        <span className="text-[15px] font-medium text-[#1A1A1A]/70 group-hover:text-[#1A1A1A] transition-colors duration-300 leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-24">
            <h2 className="font-heading text-5xl md:text-6xl font-medium tracking-tight text-[#1A1A1A] mb-6">
              Timeline
            </h2>
            <p className="text-lg font-light text-[#1A1A1A]/60 max-w-2xl mx-auto">Mark your calendars for these important dates.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative max-w-5xl mx-auto">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-[15px] left-0 right-0 h-[1px] bg-[#E5E5E5] z-0"></div>

            {[
              { tag: "Phase 1", title: "Registration Opens", p: "The portal goes live — start submitting your entries right away.", theme: "#FF9933" },
              { tag: "Phase 2", title: "Last Date for Submission", p: "Submit your reel link before 15th August.", theme: "#138808" },
              { tag: "Phase 3", title: "Jury Evaluation", p: "Every entry is reviewed for creativity, originality, and the message it carries.", theme: "#000080" },
              { tag: "Phase 4", title: "Public Showcase", p: "Shortlisted reels go up on the official handles.", theme: "#FF9933" },
              { tag: "Phase 5", title: "Winners Announced", p: "Winners are announced and prizes are distributed.", theme: "#138808" }
            ].map((step, i) => (
              <motion.div variants={fadeIn} key={i} className="relative z-10 flex flex-col items-center text-center group cursor-default">
                
                {/* Vertical Line for Mobile */}
                {i !== 4 && <div className="md:hidden absolute top-8 bottom-[-3rem] w-[1px] bg-[#E5E5E5] z-[-1]"></div>}

                {/* Circle Indicator */}
                <div 
                  className="w-8 h-8 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center mb-8 relative"
                  style={{ '--hover-color': step.theme } as React.CSSProperties}
                >
                  {/* Inner Dot */}
                  <div className="w-2 h-2 rounded-full bg-[#D4D4D4] group-hover:bg-[var(--hover-color)] transition-colors duration-500 scale-100 group-hover:scale-[1.2]"></div>
                  
                  {/* Outer Ripple on Hover */}
                  <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-[var(--hover-color)] opacity-0 group-hover:opacity-40 scale-100 group-hover:scale-[1.5] transition-all duration-700 ease-out"></div>
                </div>
                
                <div 
                  className="text-[11px] font-semibold text-[#1A1A1A]/40 uppercase tracking-[0.2em] mb-4 group-hover:text-[var(--hover-color)] transition-colors duration-500" 
                  style={{ '--hover-color': step.theme } as React.CSSProperties}
                >
                  {step.tag}
                </div>
                
                <h4 className="font-medium text-[17px] mb-3 leading-snug text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#000]">
                  {step.title}
                </h4>
                
                <p className="text-[14px] font-light text-[#1A1A1A]/50 leading-[1.6] max-w-[200px]">
                  {step.p}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Participate & Submit Form */}
      <section id="submit" className="py-24 px-6 md:px-12 bg-[#FAF9F6]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Steps */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#1A1A1A] mb-12">
                How to participate
              </h2>
              <div className="flex flex-col gap-8">
                {[
                  { n: "1", title: "Create a reel", p: "Pick a theme from above and shoot your reel — anywhere between 15 and 90 seconds." },
                  { n: "2", title: "Upload it", p: "Post it on Instagram, Facebook, or YouTube Shorts — wherever you already create." },
                  { n: "3", title: "Tag #GenZWithTheNation", p: "The hashtag needs to be in your caption — that's how we track and verify your entry." },
                  { n: "4", title: "Submit your reel link", p: "Fill in your details in the form and paste the link to your reel." },
                  { n: "5", title: "Wait for results", p: "That's it. We'll take it from here — keep an eye out for the winners' announcement." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 items-start group relative">
                    {/* Vertical connecting line */}
                    {i !== 4 && <div className="absolute left-6 top-16 bottom-[-2rem] w-[1px] bg-[#1A1A1A]/10 hidden md:block"></div>}

                    <div className="w-12 h-12 shrink-0 rounded-full border border-[#1A1A1A]/10 bg-white flex items-center justify-center font-medium text-lg text-[#1A1A1A]/50 group-hover:text-[#1A1A1A] group-hover:border-[#1A1A1A]/30 transition-colors shadow-sm relative z-10">
                      {step.n}
                    </div>
                    <div className="pt-2">
                      <h4 className="font-medium text-xl mb-2 text-[#1A1A1A]">{step.title}</h4>
                      <p className="font-light text-[#1A1A1A]/70 text-base leading-relaxed">{step.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Poster Image */}
            <div className="bg-white rounded-3xl shadow-xl shadow-[#1A1A1A]/5 border border-[#1A1A1A]/5 overflow-hidden flex items-center justify-center p-2 md:p-4">
              <img 
                src="/campaign-poster.jpg" 
                alt="Gen Z With The Nation Poster" 
                className="w-full h-auto object-cover rounded-2xl" 
              />
            </div>
          </div>
        </div>
      </section>
      {/* Details / Good to Know */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <div className="inline-flex items-center rounded-full bg-[#1A1A1A]/5 text-[#1A1A1A] px-4 py-1 text-xs font-medium tracking-widest uppercase mb-6">Good to Know</div>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight leading-tight text-[#1A1A1A]">
              Eligibility, prizes, and ground rules.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#1A1A1A]/5 shadow-sm">
              <h4 className="font-medium uppercase tracking-widest text-sm mb-6 border-b border-[#1A1A1A]/10 pb-4 text-[#1A1A1A]">Eligibility</h4>
              <ul className="space-y-4 font-light text-[#1A1A1A]/70 text-base">
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> Open to creators aged 13–30</li>
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> Reel duration: 15–90 seconds</li>
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> Hindi, English, or any regional language</li>
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> Original content only — no plagiarism</li>
              </ul>
            </div>
            <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#1A1A1A]/5 shadow-sm">
              <h4 className="font-medium uppercase tracking-widest text-sm mb-6 border-b border-[#1A1A1A]/10 pb-4 text-[#1A1A1A]">Rewards</h4>
              <ul className="space-y-4 font-light text-[#1A1A1A]/70 text-base">
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> Top entry: up to ₹51,000 cash</li>
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> Runner-up and category prizes</li>
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> Certificate for every participant</li>
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> Feature on official social handles</li>
              </ul>
            </div>
            <div className="bg-[#FAF9F6] rounded-3xl p-8 border border-[#1A1A1A]/5 shadow-sm">
              <h4 className="font-medium uppercase tracking-widest text-sm mb-6 border-b border-[#1A1A1A]/10 pb-4 text-[#1A1A1A]">Ground Rules</h4>
              <ul className="space-y-4 font-light text-[#1A1A1A]/70 text-base">
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> One creator may submit multiple entries</li>
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> No hate speech, abuse, or offensive language</li>
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> #GenZWithTheNation must appear in caption</li>
                <li className="flex gap-3"><Check className="shrink-0 w-5 h-5 text-[#3A5F45]" /> Decisions of the jury are final</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-[#3A5F45] text-white text-center relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center rounded-full bg-white/10 text-white px-5 py-2 text-xs font-medium tracking-widest uppercase mb-10 border border-white/20 backdrop-blur-sm">Independence Day Edition</div>
          <h2 className="font-heading text-5xl md:text-6xl font-medium tracking-tight leading-tight mb-8">
            <span className="text-white/80">This Independence Day,</span><br />
            <span className="text-white">show your love for your country.</span>
          </h2>
          <p className="text-lg md:text-xl font-light max-w-2xl mb-12 text-white/80 leading-relaxed">
            Make a reel. Say what's on your mind. And win a cash prize — with nothing but your own creativity.
          </p>
          <a href="#submit" className="bg-white text-[#3A5F45] px-10 py-5 rounded-full hover:bg-[#FAF9F6] hover:-translate-y-1 transition-all duration-300 font-medium tracking-wide text-lg shadow-xl shadow-black/10 flex items-center justify-center gap-3">
            Submit Your Reel Now <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-md cursor-pointer" onClick={() => setActiveVideo(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative z-10 w-full max-w-[400px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-black/5"
          >
            <button onClick={() => setActiveVideo(null)} className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <video src={activeVideo} className="absolute inset-0 w-full h-full object-cover" autoPlay loop controls playsInline />
          </motion.div>
        </div>
      )}
    </div>
  );
}
