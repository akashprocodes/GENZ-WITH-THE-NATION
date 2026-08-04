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
      
      {/* Minimal Marquee Ribbon */}
      <div className="bg-[#FAF9F6] text-[#1A1A1A]/60 py-3 border-b border-[#1A1A1A]/10 overflow-hidden whitespace-nowrap text-sm font-medium tracking-widest uppercase">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="inline-block"
        >
          <span className="mx-6">✦ CELEBRATING INDEPENDENCE DAY</span>
          <span className="mx-6">✦ CALLING ALL CREATORS</span>
          <span className="mx-6">✦ ₹51,000 PRIZE POOL</span>
          <span className="mx-6">✦ GET OFFICIALLY FEATURED</span>
          <span className="mx-6">✦ NATIONWIDE SHOWCASE</span>
          <span className="mx-6">✦ CELEBRATING INDEPENDENCE DAY</span>
          <span className="mx-6">✦ CALLING ALL CREATORS</span>
          <span className="mx-6">✦ ₹51,000 PRIZE POOL</span>
          <span className="mx-6">✦ GET OFFICIALLY FEATURED</span>
          <span className="mx-6">✦ NATIONWIDE SHOWCASE</span>
        </motion.div>
      </div>

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
          <motion.div variants={fadeIn} className="inline-flex items-center rounded-full bg-[#1A1A1A]/5 backdrop-blur-sm border border-[#1A1A1A]/10 text-[#1A1A1A] px-5 py-2 text-sm font-medium tracking-wide mb-8 shadow-sm">
            ✦ Independence Day Edition
          </motion.div>
          
          <motion.h1 
            variants={fadeIn} 
            className="font-heading text-6xl sm:text-7xl md:text-[7rem] font-medium tracking-tight leading-[1.05] text-[#1A1A1A] mb-8"
          >
            Your Reel.<br/>
            <span className="text-[#3A5F45] italic font-light">Your India.</span><br/>
            Your Story.
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl md:text-2xl font-light text-[#1A1A1A]/70 max-w-2xl mb-12 leading-relaxed">
            A national movement empowering the next generation to voice their vision for the country. Join thousands of creators across India.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6 items-center">
            <a href="#submit" className="bg-[#1A1A1A] text-white px-10 py-5 rounded-full hover:bg-[#3A5F45] hover:-translate-y-1 transition-all duration-300 font-medium tracking-wide text-lg shadow-xl shadow-[#3A5F45]/20 flex items-center gap-3 group">
              Submit Your Reel <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="text-[#1A1A1A] px-8 py-5 rounded-full hover:bg-black/5 transition-all duration-300 font-medium tracking-wide text-lg border border-[#1A1A1A]/10">
              Learn More
            </a>
          </motion.div>

          {/* Minimal Stats */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-16 mt-20 pt-12 border-t border-[#1A1A1A]/10 w-full justify-center">
            {[
              { label: "Entries", value: "12K+" },
              { label: "States", value: "28" },
              { label: "Prize Pool", value: "₹51K" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-4xl font-medium tracking-tight text-[#1A1A1A]">{stat.value}</span>
                <span className="text-xs font-medium tracking-widest uppercase text-[#1A1A1A]/50 mt-2">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-flex items-center rounded-full bg-[#1A1A1A]/5 text-[#1A1A1A] px-4 py-1 text-xs font-medium tracking-widest uppercase mb-8">About the Movement</div>
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-8 text-[#1A1A1A]">
              One reel, one story of what the nation means to you.
            </h2>
            <p className="text-lg font-light leading-relaxed mb-6 text-[#1A1A1A]/80">
              Gen Z With The Nation is a nationwide creative movement celebrating the spirit of patriotism through the lens of young India. It invites creators to share stories, ideas, and moments that reflect their love for the nation — in their own voice, their own style.
            </p>
            <p className="text-lg font-light leading-relaxed text-[#1A1A1A]/60">
              There's no single right format. Your reel could be a story, a dance, a vlog, a spoken-word piece, or simply you talking to camera — as long as it's honest and it's yours.
            </p>
          </div>
          <div>
            <div className="font-medium uppercase tracking-widest text-sm mb-8 flex items-center gap-3 text-[#1A1A1A]/60">
              <Star className="w-4 h-4" /> Themes to build your reel around
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: "🇮🇳", text: "My India, my identity — what the nation means to you" },
                { icon: "🎖️", text: "A salute to our armed forces and security personnel" },
                { icon: "❤️", text: "A moment that made you feel proud to be Indian" },
                { icon: "🤝", text: "Real stories of service — to your community or country" }
              ].map((theme, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-[#FAF9F6] hover:bg-white hover:shadow-xl hover:shadow-[#1A1A1A]/5 transition-all duration-300 group border border-[#1A1A1A]/5">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{theme.icon}</span>
                  <span className="font-medium text-[#1A1A1A] text-lg">{theme.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Grid */}
      <section id="why" className="py-24 px-6 md:px-12 bg-[#FAF9F6]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#1A1A1A] mb-4">
              Why Participate
            </h2>
            <p className="text-lg font-light text-[#1A1A1A]/70 max-w-2xl mx-auto">More than just a competition, it's a platform to amplify your voice.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { num: "01", title: "Showcase your craft", desc: "Tell your story your way — in your language, your style, your format." },
              { num: "02", title: "Reach a wider audience", desc: "Every entry gets amplified through cross-promotion on our official handles." },
              { num: "03", title: "Get officially featured", desc: "Shortlisted reels are shared and celebrated across our official social channels." },
              { num: "04", title: "Win cash prizes", desc: "A prize pool of up to ₹51,000 is set aside for the top entries." },
              { num: "05", title: "Earn a certificate", desc: "Every participant receives a certificate; top creators get a formal letter of recognition." },
              { num: "06", title: "Join a growing network", desc: "Connect with thousands of young creators across India telling the same story." }
            ].map((card, i) => (
              <div key={i} className="relative bg-white rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 overflow-hidden group shadow-lg shadow-[#1A1A1A]/5 border border-[#1A1A1A]/5">
                <div className="absolute -right-4 -top-4 font-heading text-[120px] font-bold text-[#FAF9F6] z-0 group-hover:scale-110 transition-transform duration-500">{card.num}</div>
                <h3 className="text-xl font-medium mb-3 relative z-10 text-[#1A1A1A]">{card.title}</h3>
                <p className="font-light text-[#1A1A1A]/70 relative z-10 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight text-[#1A1A1A] mb-4">
              Timeline
            </h2>
            <p className="text-lg font-light text-[#1A1A1A]/70 max-w-2xl mx-auto">Mark your calendars for these important dates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-4 left-10 right-10 h-[1px] bg-[#1A1A1A]/10 z-0"></div>
            
            {[
              { tag: "Phase 1", title: "Registration Opens", p: "The portal goes live — start submitting your entries right away." },
              { tag: "Phase 2", title: "Last Date for Submission", p: "Submit your reel link before 15th August." },
              { tag: "Phase 3", title: "Jury Evaluation", p: "Every entry is reviewed for creativity, originality, and the message it carries." },
              { tag: "Phase 4", title: "Public Showcase", p: "Shortlisted reels go up on the official handles." },
              { tag: "Phase 5", title: "Winners Announced", p: "Winners are announced and prizes are distributed." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group cursor-default">
                <div className="w-8 h-8 rounded-full bg-white border border-[#1A1A1A]/20 flex items-center justify-center mb-6 shadow-sm group-hover:border-[#3A5F45] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#1A1A1A]/20 group-hover:bg-[#3A5F45] transition-colors"></div>
                </div>
                <div className="text-xs font-medium text-[#1A1A1A]/50 uppercase tracking-widest mb-3">{step.tag}</div>
                <h4 className="font-medium text-lg mb-3 leading-tight text-[#1A1A1A]">{step.title}</h4>
                <p className="text-sm font-light text-[#1A1A1A]/60 leading-relaxed">{step.p}</p>
              </div>
            ))}
          </div>
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

            {/* Right: Form */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-[#1A1A1A]/5 border border-[#1A1A1A]/5">
              <h3 className="text-2xl font-medium mb-8 text-[#1A1A1A]">Submit your entry</h3>
              <form className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">Full Name</label>
                    <input type="text" placeholder="e.g. Ankita Sharma" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">Mobile Number</label>
                    <input type="text" placeholder="10-digit number" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">City / State</label>
                    <input type="text" placeholder="e.g. Bhopal, MP" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">Insta / YT Handle</label>
                    <input type="text" placeholder="@yourusername" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-[#1A1A1A]/60 uppercase tracking-widest">Reel Link</label>
                  <input type="text" placeholder="Paste your reel's link here" className="bg-[#FAF9F6] border border-[#1A1A1A]/10 rounded-xl p-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#1A1A1A]/30 focus:ring-1 focus:ring-[#1A1A1A]/30 transition-all" />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="border border-[#1A1A1A]/10 border-dashed rounded-xl bg-[#FAF9F6] p-6 text-center cursor-pointer hover:bg-black/5 transition-colors">
                    <span className="text-sm font-medium text-[#1A1A1A]/70">Click to choose a file — MP4, up to 200MB (Optional)</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start mt-2">
                  <input type="checkbox" className="w-5 h-5 rounded border-[#1A1A1A]/20 text-[#3A5F45] focus:ring-[#3A5F45] shrink-0 mt-0.5 cursor-pointer" />
                  <span className="text-sm font-light text-[#1A1A1A]/70 leading-relaxed cursor-pointer">I confirm this reel is my original work, that it includes the #GenZWithTheNation hashtag, and I grant permission for it to be shared on official handles.</span>
                </div>

                <button type="button" className="bg-[#1A1A1A] text-white p-4 rounded-xl font-medium tracking-wide mt-4 hover:bg-[#3A5F45] hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-[#1A1A1A]/10 w-full text-center">
                  Submit Entry
                </button>
              </form>
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
              <span className="text-white/80">This Independence Day,</span><br/>
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
