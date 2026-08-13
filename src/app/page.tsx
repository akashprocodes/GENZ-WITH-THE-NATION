"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Upload, Video, Star, Target, Zap, Clock, Users, ShieldAlert, Award, FileText, Check, ArrowUpRight, Hand } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
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
      <section className="relative h-[100dvh] pt-16 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-[#FAF9F6]">
        {/* Background Sketch Image */}
        <div
          className="absolute inset-0 z-0 opacity-80 mix-blend-multiply pointer-events-none"
          style={{ backgroundImage: "url('/bg-india.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
        ></div>
        {/* Soft bottom gradient to blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FAF9F6] to-transparent z-0"></div>

        <div className="max-w-[1000px] w-full mx-auto flex flex-col items-center text-center relative z-10 -mt-4 md:-mt-8">
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

          <motion.p variants={fadeIn} className="text-xl md:text-2xl font-light text-[#1A1A1A]/70 max-w-2xl mb-6 pb-0 leading-relaxed">
            A national movement empowering the next generation to voice their vision for the country. Join thousands of creators across India.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col gap-3 items-center mt-4">
            <Link
              href="/submit"
              className="group relative inline-flex items-center p-1.5 pr-8 rounded-full bg-[#FAF9F6] border border-[#E5E5E5] text-[#1A1A1A] hover:border-transparent overflow-hidden transition-all duration-500 shadow-sm hover:shadow-[0_8px_30px_rgba(255,153,51,0.25)] hover:-translate-y-1 w-full sm:w-auto"
            >
              <span className="absolute left-1.5 top-1.5 w-[42px] h-[42px] sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-[15] origin-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"></span>
              <span className="absolute left-1.5 top-1.5 w-[42px] h-[42px] sm:w-12 sm:h-12 rounded-full bg-[#1A1A1A] group-hover:scale-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"></span>
              <span className="relative flex items-center justify-center w-[42px] h-[42px] sm:w-12 sm:h-12 rounded-full text-white group-hover:text-[#1A1A1A] transition-colors duration-500 z-10 shrink-0">
                <Video className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
              </span>
              <span className="relative ml-4 sm:ml-5 font-serif font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[11px] sm:text-[13px] text-[#1A1A1A] z-10 transition-colors duration-500">
                Registration Form
              </span>
            </Link>

            <Link
              href="/upload"
              className="group relative inline-flex items-center p-1.5 pr-8 rounded-full bg-[#FAF9F6] border border-[#E5E5E5] text-[#1A1A1A] hover:border-transparent overflow-hidden transition-all duration-500 shadow-sm hover:shadow-[0_8px_30px_rgba(255,153,51,0.25)] hover:-translate-y-1 w-full sm:w-auto"
            >
              <span className="absolute left-1.5 top-1.5 w-[42px] h-[42px] sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-[15] origin-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"></span>
              <span className="absolute left-1.5 top-1.5 w-[42px] h-[42px] sm:w-12 sm:h-12 rounded-full bg-[#1A1A1A] group-hover:scale-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"></span>
              <span className="relative flex items-center justify-center w-[42px] h-[42px] sm:w-12 sm:h-12 rounded-full text-white group-hover:text-[#1A1A1A] transition-colors duration-500 z-10 shrink-0">
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 group-hover:scale-110 transition-all duration-500" />
              </span>
              <span className="relative ml-4 sm:ml-5 font-serif font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[11px] sm:text-[13px] text-[#1A1A1A] z-10 transition-colors duration-500">
                Upload Video
              </span>
            </Link>
          </motion.div>

          <motion.p variants={fadeIn} className="mt-4 pb-2 text-[11px] md:text-xs font-medium text-[#1A1A1A]/50 max-w-lg uppercase tracking-wider leading-relaxed">
            <span className="text-red-500">* Disclaimer:</span> Reels will be valid only if GenzWithNation is added as a collaborator on Facebook and Instagram.
          </motion.p>

          {/* Sponsors Section */}
          <motion.div variants={fadeIn} className="mt-4 md:mt-6 w-full flex flex-col items-center gap-3 pb-0">
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/80">Sponsored By</span>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white flex items-center justify-center p-1 md:p-1.5 shadow-sm">
                <img src="/images/sponsors/sponsor2.jpg" alt="Jai Hind Bro" className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white flex items-center justify-center p-1 md:p-1.5 shadow-sm">
                <img src="/images/sponsors/sponsor1.jpg" alt="Aayudh" className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white flex items-center justify-center p-1 md:p-1.5 shadow-sm">
                <img src="/images/sponsors/sponsor4.png" alt="HLBS" className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>
              <img src="/images/sponsors/sponsor3.png" alt="PrintBajar" className="h-7 md:h-10 w-auto object-contain mix-blend-multiply" />
            </div>
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
          <span className="mx-6">🇮🇳 15 August Independence Day Reels Competition • 🎥 Create a Patriotic Reel • 📲 Mandatory: Tag @genzwithnation on Instagram • 🏆 Win Exciting Cash Prizes & Certificates • 📅 Last Date: 15 August 2026 • 🚀 Register Now • ❤️ #GENZWithTheNation</span>
          <span className="mx-6">🇮🇳 15 August Independence Day Reels Competition • 🎥 Create a Patriotic Reel • 📲 Mandatory: Tag @genzwithnation on Instagram • 🏆 Win Exciting Cash Prizes & Certificates • 📅 Last Date: 15 August 2026 • 🚀 Register Now • ❤️ #GENZWithTheNation</span>
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
      <section id="why" className="py-24 px-6 md:px-12 bg-gradient-to-b from-white to-[#FAF9F6] relative overflow-hidden">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#FF9933]/20 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] rounded-full bg-[#000080]/15 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-[#138808]/20 blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        </div>

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
                title: "Exciting Rewards",
                points: ["Exclusive rewards for winners", "Special recognition for top entries", "Support for emerging creators"],
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
                className={`transition-transform duration-700 ${i % 2 === 1 ? 'md:translate-y-8' : ''} ${i % 3 === 1 ? 'lg:translate-y-12' : 'lg:translate-y-0'}`}
              >
                <motion.div variants={fadeIn} className="relative h-full bg-white/70 hover:bg-white/95 backdrop-blur-2xl rounded-[24px] p-6 md:p-7 hover:-translate-y-2 transition-all duration-500 overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] border border-white/80">

                  {/* Subtle Background Radial Glow on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top right, ${card.theme}, transparent 70%)` }}
                  ></div>

                  {/* Subtle Background Pattern (Abstract rings) */}
                  <svg width="120" height="120" viewBox="0 0 150 150" className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-1000 ease-out">
                    <circle cx="75" cy="75" r="50" fill="none" stroke="#1A1A1A" strokeWidth="2" />
                    <circle cx="75" cy="75" r="70" fill="none" stroke="#1A1A1A" strokeWidth="1" />
                    <circle cx="75" cy="75" r="30" fill="none" stroke="#1A1A1A" strokeWidth="0.5" strokeDasharray="4 4" />
                  </svg>

                  {/* Animated Icon Box */}
                  <div className="relative w-12 h-12 rounded-xl bg-[#FAF9F6] border border-black/5 flex items-center justify-center mb-6 overflow-hidden shadow-sm group-hover:shadow-lg transition-shadow duration-500 z-10"
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
                  <h3 className="font-serif text-[20px] font-bold text-[#1A1A1A] group-hover:text-transparent bg-clip-text mb-3 relative z-10 tracking-tight leading-tight pr-2 transition-colors duration-500"
                    style={{ backgroundImage: `linear-gradient(90deg, #1A1A1A, ${card.theme})` }}>
                    {card.title}
                  </h3>

                  {/* Sweeping Themed Line */}
                  <div
                    className="h-[2px] w-10 group-hover:w-full rounded-full mb-6 relative z-10 opacity-80 transition-all duration-700 ease-out"
                    style={{ background: `linear-gradient(90deg, ${card.theme}, transparent)` }}
                  ></div>

                  {/* Interactive Bullet Points */}
                  <ul className="space-y-3 relative z-10 mt-2">
                    {card.points.map((pt, j) => (
                      <li key={j} className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-black/5 transition-colors duration-300 group/item cursor-default">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 border border-black/5 group-hover/item:scale-110 transition-transform duration-300 shadow-sm" style={{ color: card.theme }}>
                          <ArrowRight className="w-[10px] h-[10px] transform group-hover/item:translate-x-0.5 transition-transform duration-300" />
                        </div>
                        <span className="font-sans text-[14px] font-medium text-[#1A1A1A]/90 group-hover/item:text-[#1A1A1A] transition-colors duration-300 leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Disclaimer Box */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mt-20 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md border border-red-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-5 shadow-[0_8px_30px_rgb(255,0,0,0.06)] relative overflow-hidden group hover:shadow-[0_20px_40px_rgb(255,0,0,0.1)] transition-all duration-500 hover:-translate-y-1">
              {/* Soft red glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100 relative z-10 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                <ShieldAlert className="w-6 h-6 text-red-500 group-hover:text-white transition-colors duration-500" />
              </div>

              <div className="text-center md:text-left relative z-10 pt-1">
                <h4 className="font-bold text-[#1A1A1A] mb-2 tracking-widest uppercase text-xs">Important Disclaimer</h4>
                <p className="text-[#1A1A1A]/80 text-[15px] leading-relaxed font-medium">
                  Reels will be considered valid <span className="text-red-500 font-bold">only if</span> <span className="bg-[#1A1A1A]/5 px-2 py-0.5 rounded text-[#1A1A1A]">@genzwithnation</span> is added as a collaborator on Facebook and Instagram.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-24 flex flex-col items-center">
            <h2 className="font-heading text-5xl md:text-6xl font-medium tracking-tight text-[#1A1A1A] mb-6">
              Timeline
            </h2>
            <p className="text-lg font-light text-[#1A1A1A]/60 max-w-2xl mx-auto">Mark your calendars for these important dates.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative max-w-[1300px] mx-auto px-4">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#FF9933]/30 via-[#000080]/30 to-[#138808]/30 z-0"></div>

            {[
              { tag: "Phase 1", title: "Registration Opens", p: "The portal goes live — start submitting your entries right away.", theme: "border-[#FF9933]", text: "text-[#FF9933]", bg: "bg-[#FF9933]" },
              { tag: "Phase 2", title: "Last Date for Submission", p: "Submit your reel link before 15th August.", theme: "border-[#138808]", text: "text-[#138808]", bg: "bg-[#138808]" },
              { tag: "Phase 3", title: "Jury Evaluation", p: "Every entry is reviewed for creativity, originality, and the message it carries.", theme: "border-[#000080]", text: "text-[#000080]", bg: "bg-[#000080]" },
              { tag: "Phase 4", title: "Public Showcase", p: "Shortlisted reels go up on the official handles.", theme: "border-[#FF9933]", text: "text-[#FF9933]", bg: "bg-[#FF9933]" },
              { tag: "Phase 5", title: "Winners Announced", p: "Winners are announced and prizes are distributed.", theme: "border-[#138808]", text: "text-[#138808]", bg: "bg-[#138808]" }
            ].map((step, i) => (
              <motion.div variants={fadeIn} key={i} className="relative z-10 flex flex-col items-center text-center group cursor-default">

                {/* Vertical Line for Mobile */}
                {i !== 4 && <div className="md:hidden absolute top-14 bottom-[-2rem] w-[2px] bg-gradient-to-b from-black/5 to-black/5 z-[-1]"></div>}

                {/* Circle Indicator */}
                <div
                  className={`w-14 h-14 shrink-0 rounded-full bg-white border-2 flex items-center justify-center mb-6 relative transition-colors duration-500 shadow-sm ${step.theme}`}
                >
                  {/* Inner Dot */}
                  <div className={`w-3 h-3 shrink-0 rounded-full transition-colors duration-500 ${step.bg}`}></div>

                  {/* Outer Ripple on Hover */}
                  <div className={`absolute -inset-2 rounded-full border border-transparent opacity-0 group-hover:opacity-20 scale-50 group-hover:scale-100 transition-all duration-500 ease-out ${step.theme}`}></div>
                </div>

                <div className="bg-white/50 backdrop-blur-sm border border-black/5 rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] w-full max-w-[260px] flex-1 flex flex-col justify-start">
                  <div className={`text-[11px] font-serif font-bold uppercase tracking-[0.2em] mb-3 transition-colors duration-500 ${step.text}`}>
                    {step.tag}
                  </div>

                  <h4 className="font-serif font-bold text-[17px] mb-3 leading-snug text-[#1A1A1A] transition-colors duration-500 group-hover:text-black">
                    {step.title}
                  </h4>

                  <p className="text-[13px] font-serif font-normal text-[#1A1A1A]/60 leading-relaxed flex-grow">
                    {step.p}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How to Participate & Submit Form */}
      <section id="submit" className="py-24 px-6 md:px-12 bg-[#FAF9F6] relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#3A5F45]/5 to-transparent pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Steps */}
            <div>
              <div className="mb-12">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A]">
                  How to <span className="italic font-serif font-medium text-[#FF9933]">participate</span>
                </h2>
              </div>

              <div className="flex flex-col gap-8 relative">
                {/* Connecting line */}
                <div className="absolute left-[28px] top-12 bottom-12 w-[2px] bg-gradient-to-b from-[#FF9933]/30 via-[#138808]/30 to-transparent hidden md:block"></div>

                {[
                  { n: "1", title: "Create a reel", p: "Pick a theme from above and shoot your reel — anywhere between 30 and 60 seconds.", color: "group-hover:border-[#FF9933] group-hover:text-[#FF9933]", bg: "group-hover:bg-[#FF9933]/10" },
                  { n: "2", title: "Upload it", p: "Post it on Instagram, Facebook, or YouTube Shorts — wherever you already create.", color: "group-hover:border-[#1A1A1A] group-hover:text-[#1A1A1A]", bg: "group-hover:bg-[#1A1A1A]/5" },
                  { n: "3", title: "Tag #GenZWithTheNation", p: "The hashtag needs to be in your caption — that's how we track and verify your entry.", color: "group-hover:border-[#138808] group-hover:text-[#138808]", bg: "group-hover:bg-[#138808]/10" },
                  { n: "4", title: "Submit your reel link", p: "Fill in your details in the form and paste the link to your reel.", color: "group-hover:border-[#FF9933] group-hover:text-[#FF9933]", bg: "group-hover:bg-[#FF9933]/10" },
                  { n: "5", title: "Wait for results", p: "That's it. We'll take it from here — keep an eye out for the winners' announcement.", color: "group-hover:border-[#138808] group-hover:text-[#138808]", bg: "group-hover:bg-[#138808]/10" }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 items-start group relative transition-all duration-300 hover:-translate-x-[-8px]">
                    <div className={`w-14 h-14 shrink-0 rounded-full border-2 border-[#1A1A1A]/10 bg-white flex items-center justify-center font-bold text-xl text-[#1A1A1A]/40 transition-all duration-500 shadow-sm relative z-10 ${step.color} ${step.bg}`}>
                      {step.n}
                    </div>
                    <div className="pt-3">
                      <h4 className="font-bold text-xl mb-2 text-[#1A1A1A] group-hover:text-[#000] transition-colors">{step.title}</h4>
                      <p className="font-medium text-[#1A1A1A]/60 text-[15px] leading-relaxed max-w-[400px] group-hover:text-[#1A1A1A]/90 transition-colors">{step.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Poster Image */}
            <div className="relative group [perspective:1000px] max-w-md mx-auto w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF9933]/20 via-transparent to-[#138808]/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="bg-white/60 backdrop-blur-xl rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white p-3 md:p-5 relative transform transition-all duration-700 group-hover:[transform:rotateY(-5deg)_rotateX(5deg)_scale(1.02)]">
                <img
                  src="/final-poster.jpg"
                  alt="Gen Z With The Nation Poster"
                  className="w-full h-auto object-cover rounded-[24px]"
                />

                {/* Floating decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#FF9933]/20 to-transparent rounded-full blur-xl pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-[#138808]/20 to-transparent rounded-full blur-xl pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Details / Good to Know */}
      {/* Details / Good to Know */}
      <section className="py-24 px-6 md:px-12 bg-[#FAF9F6] relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-black/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]"></span>
              <span className="text-[#1A1A1A]/80">Good to Know</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#138808]"></span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#1A1A1A] max-w-2xl">
              Eligibility, rewards, and <span className="italic font-serif font-medium text-[#3A5F45]">ground rules.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-black/10 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF9933]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/5 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] flex items-center justify-center border border-black/5 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-5 h-5 text-[#FF9933]" />
                </div>
                <h4 className="font-bold uppercase tracking-[0.15em] text-sm text-[#1A1A1A]">Eligibility</h4>
              </div>

              <ul className="space-y-5 font-medium text-[#1A1A1A]/70 text-[15px] relative z-10">
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>Open to creators aged 13–30</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>Reel duration: 30–60 seconds</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>Hindi, English, or any regional language</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>Original content only — no plagiarism</span></li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-black/10 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#3A5F45]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/5 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] flex items-center justify-center border border-black/5 group-hover:scale-110 transition-transform duration-500">
                  <Award className="w-5 h-5 text-[#3A5F45]" />
                </div>
                <h4 className="font-bold uppercase tracking-[0.15em] text-sm text-[#1A1A1A]">Rewards</h4>
              </div>

              <ul className="space-y-5 font-medium text-[#1A1A1A]/70 text-[15px] relative z-10">
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>Certificate for every participant</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>Feature on official social handles</span></li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-black/10 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#138808]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/5 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FAF9F6] flex items-center justify-center border border-black/5 group-hover:scale-110 transition-transform duration-500">
                  <ShieldAlert className="w-5 h-5 text-[#138808]" />
                </div>
                <h4 className="font-bold uppercase tracking-[0.15em] text-sm text-[#1A1A1A]">Ground Rules</h4>
              </div>

              <ul className="space-y-5 font-medium text-[#1A1A1A]/70 text-[15px] relative z-10">
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>One creator may submit only one entry</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>No hate speech, abuse, or offensive language</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>#GenZWithTheNation must appear in caption</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 className="shrink-0 w-5 h-5 text-[#3A5F45] mt-0.5" /> <span>Decisions of the jury are final</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="p-[10px] bg-[#FAF9F6]">
        <section className="py-32 sm:py-40 px-6 bg-[#16291C] text-white text-center relative overflow-hidden rounded-[20px] shadow-2xl border border-white/10">

          {/* Background Sketch Image - Inverted for Dark Theme */}
          <div
            className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
            style={{
              backgroundImage: "url('/bg-india.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "invert(1)"
            }}
          ></div>

          {/* Animated Background Orbs */}
          <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-[#FF9933]/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-[#138808]/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">

            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.15] mb-8 font-serif">
              <span className="block text-white/95 mb-2 drop-shadow-sm">This Independence Day,</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#FFFFFF] to-[#138808] italic drop-shadow-md">show your love for India.</span>
            </h2>

            <p className="text-lg md:text-xl font-light max-w-2xl mb-14 text-white/70 leading-relaxed">
              Make a reel. Say what's on your mind. And win exciting rewards — with nothing but your own creativity.
            </p>

            <Link href="/submit" className="relative group inline-flex items-center p-2 pr-10 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#16291C] overflow-hidden transition-all duration-700 shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:-translate-y-1 mt-4">
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF9933] via-white to-[#138808] text-[#16291C] group-hover:scale-95 shadow-inner transition-transform duration-500 z-10 shrink-0">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-500" />
              </span>
              <span className="ml-6 font-bold tracking-[0.25em] text-[13px] uppercase z-10">
                Secure Your Spot
              </span>
            </Link>

          </div>
        </section>
      </div>
    </div>
  );
}
