"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Upload, Video, Star, Target, Zap, Clock, Users, ShieldAlert, Award, FileText, Check } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white text-[#1a1512] font-sans selection:bg-[#C4532B] selection:text-white">
      
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 px-6 md:px-12 flex items-center justify-start border-b-4 border-[#1a1512] bg-[#F5F2EB] overflow-hidden">

        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <motion.div variants={fadeIn} className="inline-flex items-center rounded-none bg-[#F5F2EB] px-5 py-2 text-sm text-[#1a1512] font-black tracking-widest uppercase border-2 border-[#1a1512] shadow-[4px_4px_0_0_#1a1512] transform -rotate-1 w-max">
              Reel Making Competition · Independence Day Edition
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="font-heading text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] font-black tracking-tighter leading-[0.95] uppercase relative z-10">
              <span className="text-[#1a1512] block relative z-10">Your reel.</span>
              <span className="block text-white drop-shadow-[4px_4px_0_#1a1512] relative z-10" style={{ WebkitTextStroke: '2.5px #1a1512' }}>Your India.</span>
              <span className="text-[#2B6040] block drop-shadow-[4px_4px_0_#1a1512] relative z-10">Your story.</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg md:text-xl font-bold text-[#1a1512]/90 leading-relaxed max-w-2xl bg-white border-2 border-[#1a1512] p-5 shadow-[4px_4px_0_0_#1a1512] relative z-10">
              This Independence Day, show your love for your country through your creativity. Make a reel, tag <strong className="text-[#C4532B]">#GenZWithTheNation</strong>, and stand a chance to win cash prizes, an official feature, and a bigger audience for your work.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mt-4 relative z-10">
              <a href="#submit" className="bg-[#C4532B] text-white px-8 py-4 border-2 border-[#1a1512] shadow-[4px_4px_0_0_#1a1512] hover:shadow-[0_0_0_0_#1a1512] hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-base flex items-center justify-center gap-3">
                Submit Your Reel <ArrowRight strokeWidth={3} className="w-5 h-5" />
              </a>
              <a href="#about" className="bg-white text-[#1a1512] px-8 py-4 border-2 border-[#1a1512] shadow-[4px_4px_0_0_#1a1512] hover:shadow-[0_0_0_0_#1a1512] hover:translate-x-1 hover:translate-y-1 transition-all font-black uppercase text-base flex items-center justify-center">
                See Themes & Rules
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-6 mt-4 relative z-10">
              {[
                { val: "12,400+", label: "REELS SUBMITTED", color: "#C4532B" },
                { val: "28", label: "STATES REP'D", color: "#2B6040" },
                { val: "3.1Cr+", label: "TOTAL VIEWS", color: "#FFD600" },
                { val: "₹5L", label: "PRIZE POOL", color: "#1a1512" }
              ].map((s, i) => (
                <div key={i} className="flex flex-col border-l-4 pl-3" style={{ borderColor: s.color }}>
                  <span className="font-heading font-black text-2xl md:text-3xl text-[#1a1512] uppercase leading-none mb-1">{s.val}</span>
                  <span className="font-bold text-[10px] tracking-widest text-[#1a1512]/70 uppercase">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Phone Stack (Adapted Video Fan) */}
          <motion.div variants={fadeIn} className="lg:col-span-5 relative h-[400px] flex items-center justify-center mt-8 lg:mt-0 perspective-1000">
            <div className="relative w-full max-w-[240px] aspect-[9/16] mx-auto">
              
              {/* Back Left Phone */}
              <div onClick={() => setActiveVideo("/Video-2259.mp4")} className="absolute inset-0 bg-[#C4532B] border-4 border-[#1a1512] shadow-[-8px_12px_0_0_#1a1512] transform -rotate-12 -translate-x-16 translate-y-8 rounded-3xl overflow-hidden cursor-pointer hover:-translate-x-20 transition-transform">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 bg-[#1a1512] text-white px-3 py-1 font-bold text-xs rounded-full border-2 border-white">@armaan.vlogs</div>
              </div>

              {/* Back Right Phone */}
              <div onClick={() => setActiveVideo("/Video-2259.mp4")} className="absolute inset-0 bg-[#2B6040] border-4 border-[#1a1512] shadow-[8px_12px_0_0_#1a1512] transform rotate-12 translate-x-16 translate-y-8 rounded-3xl overflow-hidden cursor-pointer hover:translate-x-20 transition-transform">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 bg-[#1a1512] text-white px-3 py-1 font-bold text-xs rounded-full border-2 border-white">@rahul.speaks</div>
              </div>

              {/* Front Main Phone */}
              <div onClick={() => setActiveVideo("/Video-2259.mp4")} className="absolute inset-0 bg-[#1a1512] border-4 border-[#1a1512] shadow-[0px_20px_0_0_#1a1512] transform z-20 rounded-3xl overflow-hidden group cursor-pointer hover:-translate-y-4 transition-transform">
                <video src="/Video-2259.mp4" className="absolute inset-0 w-full h-full object-cover opacity-90" autoPlay loop muted playsInline />
                <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center">
                    <Play className="w-8 h-8 fill-white text-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 z-20 bg-white text-[#1a1512] px-3 py-1 font-black text-xs rounded-full border-2 border-[#1a1512] shadow-[2px_2px_0_0_#1a1512]">
                  @priya.creates · #GenZWithTheNation
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Ribbon */}
      <div className="bg-[#1a1512] text-[#F5F2EB] py-3 border-b-4 border-[#1a1512] overflow-hidden whitespace-nowrap flex select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="font-heading font-black text-lg md:text-xl uppercase tracking-widest flex items-center gap-12"
        >
          {Array(8).fill("#GenZWithTheNation ✦ Prize pool up to ₹51,000 ✦ Show your love for India this Independence Day ✦").map((text, i) => (
            <span key={i} dangerouslySetInnerHTML={{ __html: text.replace("₹51,000", "<span class='text-[#C4532B]'>₹51,000</span>") }}></span>
          ))}
        </motion.div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 border-b-4 border-[#1a1512] bg-[#F5F2EB]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-flex items-center rounded-none bg-white px-4 py-1 text-xs font-black tracking-widest uppercase border-2 border-[#1a1512] shadow-[2px_2px_0_0_#1a1512] mb-8">About the Movement</div>
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8">
              One reel, one story of what the nation means to you.
            </h2>
            <p className="text-xl font-bold leading-relaxed mb-6">
              Gen Z With The Nation is a nationwide creative movement celebrating the spirit of patriotism through the lens of young India. It invites creators to share stories, ideas, and moments that reflect their love for the nation — in their own voice, their own style.
            </p>
            <p className="text-xl font-bold leading-relaxed opacity-70">
              There's no single right format. Your reel could be a story, a dance, a vlog, a spoken-word piece, or simply you talking to camera — as long as it's honest and it's yours.
            </p>
          </div>
          <div>
            <div className="font-black uppercase tracking-widest text-lg mb-6 flex items-center gap-3">
              <Star className="text-[#C4532B] fill-[#C4532B]" /> Themes to build your reel around
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: "🇮🇳", text: "My India, my identity — what the nation means to you" },
                { icon: "🎖️", text: "A salute to our armed forces and security personnel" },
                { icon: "❤️", text: "A moment that made you feel proud to be Indian" },
                { icon: "🤝", text: "Real stories of service — to your community or country" }
              ].map((theme, i) => (
                <div key={i} className="flex items-center gap-4 bg-white border-2 border-[#1a1512] p-4 shadow-[4px_4px_0_0_#1a1512] hover:bg-[#C4532B] hover:text-white transition-colors group">
                  <span className="text-3xl bg-[#F5F2EB] p-2 border-2 border-[#1a1512] shadow-[2px_2px_0_0_#1a1512] group-hover:shadow-[0_0_0_0_#1a1512]">{theme.icon}</span>
                  <span className="font-bold text-lg">{theme.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Grid */}
      <section id="why" className="py-24 px-6 md:px-12 border-b-4 border-[#1a1512] bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 max-w-2xl">
            <div className="inline-flex items-center rounded-none bg-[#C4532B] text-white px-4 py-1 text-xs font-black tracking-widest uppercase border-2 border-[#1a1512] shadow-[2px_2px_0_0_#1a1512] mb-6">Why Participate</div>
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-6">
              More than a prize. A platform for your work.
            </h2>
            <p className="text-xl font-bold opacity-70">
              Making the reel is the easy part. Getting it in front of the right audience — that's what we take care of.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { num: "01", title: "Showcase your craft", desc: "Tell your story your way — in your language, your style, your format." },
              { num: "02", title: "Reach a wider audience", desc: "Every entry gets amplified through cross-promotion on our official handles." },
              { num: "03", title: "Get officially featured", desc: "Shortlisted reels are shared and celebrated across our official social channels." },
              { num: "04", title: "Win cash prizes", desc: "A prize pool of up to ₹51,000 is set aside for the top entries." },
              { num: "05", title: "Earn a certificate", desc: "Every participant receives a certificate; top creators get a formal letter of recognition." },
              { num: "06", title: "Join a growing network", desc: "Connect with thousands of young creators across India telling the same story, differently." }
            ].map((card, i) => (
              <div key={i} className="bg-[#F5F2EB] border-4 border-[#1a1512] p-8 shadow-[6px_6px_0_0_#1a1512] hover:-translate-y-2 hover:shadow-[10px_10px_0_0_#C4532B] transition-all">
                <div className="font-heading text-5xl font-black text-[#1a1512]/20 mb-4">{card.num}</div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{card.title}</h3>
                <p className="font-bold opacity-80">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-24 px-6 md:px-12 border-b-4 border-[#1a1512] bg-[#2B6040] text-[#F5F2EB]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <div className="inline-flex items-center rounded-none bg-[#F5F2EB] text-[#1a1512] px-4 py-1 text-xs font-black tracking-widest uppercase border-2 border-[#1a1512] shadow-[2px_2px_0_0_#1a1512] mb-6">Competition Timeline</div>
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
              The full schedule,<br/>at a glance.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { tag: "Step 1", title: "Registration Opens", p: "The portal goes live — start submitting your entries right away." },
              { tag: "Step 2", title: "Last Date for Submission", p: "Submit your reel link before 15th August." },
              { tag: "Step 3", title: "Jury Evaluation", p: "Every entry is reviewed for creativity, originality, and the message it carries." },
              { tag: "Step 4", title: "Public Showcase", p: "Shortlisted reels go up on the Community Wall and official handles." },
              { tag: "Step 5", title: "Winners Announcement", p: "Winners are announced and prizes are distributed." }
            ].map((step, i) => (
              <div key={i} className="bg-[#1a1512] border-2 border-[#1a1512] p-6 shadow-[4px_4px_0_0_#F5F2EB]">
                <div className="h-2 w-full bg-[#C4532B] mb-6 border border-[#1a1512]"></div>
                <div className="text-xs font-black text-[#C4532B] uppercase tracking-widest mb-2 border border-[#C4532B] px-2 py-1 inline-block bg-[#C4532B]/10">{step.tag}</div>
                <h4 className="font-bold text-xl uppercase mb-3 leading-tight">{step.title}</h4>
                <p className="text-sm font-medium opacity-80">{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How To + Submit Form */}
      <section id="submit" className="py-24 px-6 md:px-12 border-b-4 border-[#1a1512] bg-[#F5F2EB]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* Left: How to Participate */}
          <div>
            <div className="inline-flex items-center rounded-none bg-[#C4532B] text-white px-4 py-1 text-xs font-black tracking-widest uppercase border-2 border-[#1a1512] shadow-[2px_2px_0_0_#1a1512] mb-6">How to Participate</div>
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-12">
              Five steps, and your reel is live.
            </h2>
            
            <div className="flex flex-col gap-6">
              {[
                { n: "1", title: "Create a reel", p: "Pick a theme from above and shoot your reel — anywhere between 15 and 90 seconds." },
                { n: "2", title: "Upload it", p: "Post it on Instagram, Facebook, or YouTube Shorts — wherever you already create." },
                { n: "3", title: "Tag #GenZWithTheNation", p: "The hashtag needs to be in your caption — that's how we track and verify your entry." },
                { n: "4", title: "Submit your reel link", p: "Fill in your details in the form and paste the link to your reel." },
                { n: "5", title: "Wait for results", p: "That's it. We'll take it from here — keep an eye out for the winners' announcement." }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 border-b-2 border-[#1a1512] pb-6 last:border-0 items-start">
                  <div className="w-12 h-12 shrink-0 bg-white border-2 border-[#1a1512] shadow-[4px_4px_0_0_#C4532B] flex items-center justify-center font-heading font-black text-2xl">
                    {step.n}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl uppercase mb-1">{step.title}</h4>
                    <p className="font-bold opacity-70">{step.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Submission Form */}
          <div className="bg-white border-4 border-[#1a1512] p-8 shadow-[8px_8px_0_0_#1a1512]">
            <h3 className="font-heading text-3xl font-black uppercase mb-2">Submit Your Entry</h3>
            <p className="font-bold opacity-60 text-sm mb-8">Takes about 2 minutes to fill out</p>
            
            <form className="flex flex-col gap-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-xs uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="e.g. Ankita Sharma" className="border-2 border-[#1a1512] bg-[#F5F2EB] p-3 font-bold placeholder:opacity-50 focus:outline-none focus:shadow-[4px_4px_0_0_#C4532B]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-xs uppercase tracking-widest">Mobile Number</label>
                  <input type="text" placeholder="10-digit number" className="border-2 border-[#1a1512] bg-[#F5F2EB] p-3 font-bold placeholder:opacity-50 focus:outline-none focus:shadow-[4px_4px_0_0_#C4532B]" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-xs uppercase tracking-widest">City / State</label>
                  <input type="text" placeholder="e.g. Bhopal, MP" className="border-2 border-[#1a1512] bg-[#F5F2EB] p-3 font-bold placeholder:opacity-50 focus:outline-none focus:shadow-[4px_4px_0_0_#C4532B]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-xs uppercase tracking-widest">Insta / YT Handle</label>
                  <input type="text" placeholder="@yourusername" className="border-2 border-[#1a1512] bg-[#F5F2EB] p-3 font-bold placeholder:opacity-50 focus:outline-none focus:shadow-[4px_4px_0_0_#C4532B]" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-xs uppercase tracking-widest">Reel Link</label>
                <input type="text" placeholder="Paste your reel's link here" className="border-2 border-[#1a1512] bg-[#F5F2EB] p-3 font-bold placeholder:opacity-50 focus:outline-none focus:shadow-[4px_4px_0_0_#C4532B]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-xs uppercase tracking-widest">Or upload reel (optional)</label>
                <div className="border-2 border-[#1a1512] border-dashed bg-white p-4 font-bold text-center text-sm cursor-pointer hover:bg-[#F5F2EB]">
                  Click to choose a file — MP4, up to 200MB
                </div>
              </div>

              <div className="flex gap-3 items-start mt-2">
                <input type="checkbox" className="w-5 h-5 border-2 border-[#1a1512] accent-[#C4532B] mt-1 shrink-0" />
                <span className="font-bold text-xs leading-relaxed opacity-80">I confirm this reel is my original work, that it includes the #GenZWithTheNation hashtag, and I grant permission for it to be shared on official handles.</span>
              </div>

              <button type="button" className="bg-[#1a1512] text-white p-4 font-black uppercase tracking-widest mt-4 hover:bg-[#C4532B] transition-colors border-2 border-[#1a1512] shadow-[4px_4px_0_0_#1a1512]">
                Submit Entry
              </button>
            </form>
          </div>
        </div>
      </section>



      {/* Details / Good to Know */}
      <section className="py-24 px-6 md:px-12 border-b-4 border-[#1a1512] bg-[#1a1512] text-[#F5F2EB]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <div className="inline-flex items-center rounded-none bg-white text-[#1a1512] px-4 py-1 text-xs font-black tracking-widest uppercase border-2 border-white shadow-[2px_2px_0_0_#C4532B] mb-6">Good to Know</div>
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
              Eligibility, prizes, and ground rules.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-4 border-[#F5F2EB] p-8 bg-[#F5F2EB] text-[#1a1512]">
              <h4 className="font-black uppercase tracking-widest text-lg mb-6 border-b-2 border-[#1a1512] pb-4">Eligibility</h4>
              <ul className="space-y-4 font-bold">
                <li className="flex gap-3"><Check className="shrink-0" /> Open to creators aged 13–30</li>
                <li className="flex gap-3"><Check className="shrink-0" /> Reel duration: 15–90 seconds</li>
                <li className="flex gap-3"><Check className="shrink-0" /> Hindi, English, or any regional language</li>
                <li className="flex gap-3"><Check className="shrink-0" /> Original content only — no plagiarism</li>
              </ul>
            </div>
            <div className="border-4 border-[#F5F2EB] p-8 bg-[#F5F2EB] text-[#1a1512]">
              <h4 className="font-black uppercase tracking-widest text-lg mb-6 border-b-2 border-[#1a1512] pb-4">Rewards</h4>
              <ul className="space-y-4 font-bold">
                <li className="flex gap-3"><Check className="shrink-0 text-[#2B6040]" /> Top entry: up to ₹51,000 cash</li>
                <li className="flex gap-3"><Check className="shrink-0 text-[#2B6040]" /> Runner-up and category prizes</li>
                <li className="flex gap-3"><Check className="shrink-0 text-[#2B6040]" /> Certificate for every participant</li>
                <li className="flex gap-3"><Check className="shrink-0 text-[#2B6040]" /> Feature on official social handles</li>
              </ul>
            </div>
            <div className="border-4 border-[#F5F2EB] p-8 bg-[#F5F2EB] text-[#1a1512]">
              <h4 className="font-black uppercase tracking-widest text-lg mb-6 border-b-2 border-[#1a1512] pb-4">Ground Rules</h4>
              <ul className="space-y-4 font-bold">
                <li className="flex gap-3"><Check className="shrink-0 text-[#C4532B]" /> One creator may submit multiple entries</li>
                <li className="flex gap-3"><Check className="shrink-0 text-[#C4532B]" /> No hate speech, abuse, or offensive language</li>
                <li className="flex gap-3"><Check className="shrink-0 text-[#C4532B]" /> #GenZWithTheNation must appear in caption</li>
                <li className="flex gap-3"><Check className="shrink-0 text-[#C4532B]" /> Decisions of the jury are final</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 border-b-4 border-[#1a1512] bg-[#C4532B] text-white text-center relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center rounded-none bg-[#1a1512] text-white px-4 py-1 text-xs font-black tracking-widest uppercase border-2 border-white shadow-[2px_2px_0_0_#1a1512] mb-8">Independence Day Edition</div>
          <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1] mb-8">
            This Independence Day,<br/>show your love for your country.
          </h2>
          <p className="text-xl md:text-2xl font-bold opacity-90 max-w-2xl mb-12">
            Make a reel. Say what's on your mind. And win a cash prize — with nothing but your own creativity.
          </p>
          <a href="#submit" className="bg-[#1a1512] text-white px-10 py-6 border-4 border-white shadow-[8px_8px_0_0_#1a1512] hover:shadow-[0_0_0_0_#1a1512] hover:translate-x-2 hover:translate-y-2 transition-all font-black uppercase text-xl md:text-2xl flex items-center justify-center gap-4 mb-16">
            Submit Your Reel Now <ArrowRight strokeWidth={3} className="w-8 h-8" />
          </a>

          <div className="font-heading text-[6vw] font-black uppercase tracking-tighter opacity-20 leading-none">
            #GenZWithTheNation
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1a1512]/90 backdrop-blur-sm cursor-pointer" onClick={() => setActiveVideo(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-[400px] aspect-[9/16] bg-[#1a1512] border-4 border-[#F5F2EB] rounded-3xl overflow-hidden shadow-[12px_12px_0_0_#F5F2EB]"
          >
            <button onClick={() => setActiveVideo(null)} className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <video src={activeVideo} className="absolute inset-0 w-full h-full object-cover" autoPlay loop controls playsInline />
          </motion.div>
        </div>
      )}
    </div>
  );
}
