"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Play, Share2, Star, Upload, Video, ScrollText, Users, ShieldAlert, Globe } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-4 md:px-8 lg:px-12 flex items-center justify-start border-b-4 border-[#1a1512] overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1a151215_1px,transparent_1px),linear-gradient(to_bottom,#1a151215_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-[1400px] mx-auto w-full relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left: Massive Typography */}
          <div className="lg:col-span-8 relative">
            {/* Neo-brutalist Starburst Sticker */}
            <motion.div variants={fadeIn} className="absolute -top-16 right-0 md:right-12 hidden sm:flex w-32 h-32 z-10 hover:rotate-180 transition-transform duration-700 items-center justify-center">
              <div className="absolute inset-0 bg-[#C4532B] rotate-45 border-4 border-[#1a1512] shadow-[4px_4px_0_0_#1a1512]"></div>
              <div className="absolute inset-0 bg-[#C4532B] rotate-0 border-4 border-[#1a1512] shadow-[4px_4px_0_0_#1a1512]"></div>
              <span className="relative z-10 text-[#F5F2EB] font-black text-xl uppercase tracking-widest text-center leading-none rotate-[-15deg] drop-shadow-md">
                100%<br/>RAW
              </span>
            </motion.div>
            
            <motion.div variants={fadeIn} className="inline-flex items-center rounded-none bg-[#C4532B] px-5 py-2 text-sm text-[#F5F2EB] mb-8 font-black tracking-widest uppercase border-2 border-[#1a1512] shadow-[4px_4px_0_0_#1a1512] transform -rotate-2">
              A Movement by the Youth
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="font-heading text-[5.5rem] sm:text-[8rem] md:text-[10rem] xl:text-[14rem] font-black tracking-[-0.05em] leading-[0.8] text-left uppercase relative z-20">
              <span className="text-[#1a1512] block hover:text-[#2B6040] transition-colors duration-300 cursor-crosshair">GenZ</span>
              <span className="block text-[#F5F2EB] hover:!text-[#C4532B] transition-colors duration-300 cursor-crosshair drop-shadow-[4px_4px_0_#1a1512]" style={{ WebkitTextStroke: '3px #1a1512' }}>With The</span>
              <span className="text-[#2B6040] block italic lowercase hover:text-[#1a1512] transition-colors duration-300 cursor-crosshair">Nation.</span>
            </motion.h1>
          </div>

          {/* Right: Brutalist Info Box */}
          <motion.div variants={fadeIn} className="lg:col-span-4 flex flex-col relative z-20 mt-8 lg:mt-0">
            <div className="bg-[#F5F2EB] border-4 border-[#1a1512] p-8 md:p-10 shadow-[12px_12px_0_0_#1a1512] transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <p className="text-2xl md:text-3xl font-bold text-[#1a1512] leading-tight mb-8">
                Beyond Stereotypes. Beyond Labels. A digital revolution to reclaim our narrative.
              </p>
              
              <div className="flex flex-col gap-5">
                <Link href="/register">
                  <Button size="lg" className="w-full rounded-none text-xl px-8 py-8 border-4 border-[#1a1512] bg-[#C4532B] hover:bg-[#1a1512] text-[#F5F2EB] shadow-[6px_6px_0_0_#1a1512] hover:shadow-[0px_0px_0_0_#1a1512] hover:translate-y-1.5 hover:translate-x-1.5 transition-all font-black uppercase tracking-widest">
                    Join Campaign <ArrowRight className="ml-3 w-6 h-6 stroke-[3px]" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="w-full rounded-none border-4 border-[#1a1512] text-[#1a1512] bg-[#F5F2EB] hover:bg-[#2B6040] hover:text-[#F5F2EB] text-xl px-8 py-8 shadow-[6px_6px_0_0_#1a1512] hover:shadow-[0px_0px_0_0_#1a1512] hover:translate-y-1.5 hover:translate-x-1.5 transition-all font-black uppercase tracking-widest">
                    The Manifesto
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Scrolling Marquee Divider */}
      <div className="bg-[#1a1512] text-[#F5F2EB] py-5 border-b-4 border-[#1a1512] overflow-hidden whitespace-nowrap flex select-none">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="font-heading font-black text-2xl md:text-3xl uppercase tracking-widest flex items-center gap-12"
        >
          {Array(8).fill("RECLAIM THE NARRATIVE ✦ BEYOND STEREOTYPES ✦ YOUR VOICE MATTERS ✦").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* The Movement Vision */}
      <section className="py-24 border-b border-[#1a1512] bg-[#F5F2EB]">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="space-y-6"
            >
              <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">Our Vision.</h2>
              <p className="text-2xl text-foreground/80 leading-relaxed font-medium">
                We are not here to be called lazy, chronically online, or disconnected. We are here to ask questions, challenge outdated systems, and build a community that actually cares.
              </p>
              <p className="text-2xl text-foreground/80 leading-relaxed font-medium">
                Build a platform for the young people who keep getting misunderstood. That's it. That's the mission. No sponsors. Just one large, stubborn, and highly aware generation.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="bg-[#F5F2EB] border-2 border-[#1a1512] p-8 rounded-none space-y-4 hover:bg-[#1a1512] hover:text-[#F5F2EB] transition-colors group">
                <Users className="w-10 h-10 text-[#1a1512] group-hover:text-[#F5F2EB] transition-colors" />
                <h3 className="text-3xl font-black uppercase tracking-tighter">Community</h3>
                <p className="text-lg opacity-80 font-medium">Built by creators, for creators. A safe space for real talk.</p>
              </div>
              <div className="bg-[#1a1512] text-[#F5F2EB] border-2 border-[#1a1512] p-8 rounded-none space-y-4 sm:mt-12 hover:bg-[#C4532B] transition-colors group">
                <Globe className="w-10 h-10 text-[#F5F2EB]" />
                <h3 className="text-3xl font-black uppercase tracking-tighter">Impact</h3>
                <p className="text-lg opacity-90 font-medium">Taking our digital voices to make real-world changes.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Manifesto */}
      <section className="py-32 bg-[#F5F2EB] border-b border-[#1a1512]">
        <div className="container mx-auto px-4 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="font-heading text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">The Manifesto.</h2>
            <p className="text-2xl text-foreground/80 max-w-3xl font-medium">
              Read it once. Read it twice. Then send it to someone who needs to read it. These are our 5 core demands for a better future.
            </p>
          </motion.div>

          <div className="space-y-0 max-w-6xl">
            {[
              { id: "01", title: "Mental Health is Health", desc: "Therapy and mental health resources must be integrated into every educational institution and workplace by default, not as a luxury." },
              { id: "02", title: "End the Hustle Culture Toxic Loop", desc: "We demand fair wages, strict boundaries for working hours, and the eradication of unpaid internships that exploit youth labor." },
              { id: "03", title: "Climate Accountability Now", desc: "Corporations must be held strictly accountable for their carbon footprint. Greenwashing will no longer be accepted as a PR strategy." },
              { id: "04", title: "Transparent Education Reform", desc: "Curriculums must teach financial literacy, digital rights, and real-world survival skills, moving away from rote memorization." },
              { id: "05", title: "Authentic Representation", desc: "We demand media and political representation that accurately reflects our diversity, rather than caricatures created by older generations." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 p-8 md:p-12 border-t-2 border-[#1a1512] hover:bg-[#1a1512] hover:text-[#F5F2EB] transition-colors group first:border-t-0"
              >
                <div className="text-6xl md:text-8xl font-heading font-black opacity-30 shrink-0 leading-none group-hover:opacity-100 transition-opacity group-hover:text-[#C4532B]">{item.id}</div>
                <div>
                  <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">{item.title}</h3>
                  <p className="text-xl md:text-2xl opacity-80 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section (Satirical) */}
      <section className="py-24 border-b border-[#1a1512] bg-[#F5F2EB]">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">Are you eligible to join?</h2>
              <p className="text-2xl text-foreground/80 font-medium">
                We do not check your background. We do, however, have four standards.
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                { title: "REQ / 01 Misunderstood", desc: "Told you are 'always on your phone' while actually building a career online." },
                { title: "REQ / 02 Chronically Online", desc: "You know the context of a meme within 5 seconds of seeing it." },
                { title: "REQ / 03 Existentially Aware", desc: "Worried about the economy and the climate, but still finding time to laugh." },
                { title: "REQ / 04 Can Rant Professionally", desc: "As long as the content is sharp, honest, and points at something that actually matters." }
              ].map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 md:p-8 bg-transparent border-2 border-[#1a1512] hover:bg-[#C4532B] hover:text-[#F5F2EB] hover:border-[#C4532B] transition-colors group"
                >
                  <div>
                    <h4 className="font-bold text-2xl uppercase tracking-tight">{req.title}</h4>
                    <p className="text-lg mt-2 opacity-80 font-medium">{req.desc}</p>
                  </div>
                  <CheckCircle2 className="text-[#1a1512] w-8 h-8 shrink-0 mt-4 sm:mt-0 sm:ml-4 group-hover:text-[#F5F2EB] transition-colors" />
                </motion.div>
              ))}
            </div>
            <p className="text-center mt-12 text-foreground/60 font-bold uppercase tracking-widest text-sm">
              Membership is free, lifelong, and revocable only by you. No fees. No annoying spam.
            </p>
          </div>
        </div>
      </section>

      {/* Protect the Truth */}
      <section className="py-24 bg-[#2B6040] border-b border-[#1a1512] text-[#F5F2EB]">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <ShieldAlert className="w-20 h-20 mb-8 text-[#F5F2EB]" />
              <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">Preserve Evidence.<br/>Defend The Truth.</h2>
              <p className="text-2xl text-[#F5F2EB]/80 leading-relaxed mb-10 font-medium">
                Too many authentic stories get lost in the noise or suppressed by algorithms. We are building a secure vault for your raw videos and stories. When you submit your campaign video, it is securely archived to ensure our generation's history is written by us, not for us.
              </p>
              <Link href="/register">
                <Button size="lg" className="rounded-none border-2 border-[#F5F2EB] bg-transparent text-[#F5F2EB] hover:bg-[#F5F2EB] hover:text-[#2B6040] text-xl px-10 py-8 uppercase tracking-widest font-bold">
                  Submit Your Story <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-transparent p-8 md:p-12 border-2 border-[#F5F2EB]">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-8">How it works</h3>
              <ul className="space-y-8">
                <li className="flex items-start">
                  <div className="w-12 h-12 border-2 border-[#F5F2EB] font-black flex items-center justify-center shrink-0 mr-6 text-xl">1</div>
                  <div>
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">Record Reality</h4>
                    <p className="text-lg text-[#F5F2EB]/80 font-medium">Film your raw, unedited thoughts or experiences.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 border-2 border-[#F5F2EB] font-black flex items-center justify-center shrink-0 mr-6 text-xl">2</div>
                  <div>
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">Upload Securely</h4>
                    <p className="text-lg text-[#F5F2EB]/80 font-medium">Submit your file through our secure portal.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-12 h-12 border-2 border-[#F5F2EB] font-black flex items-center justify-center shrink-0 mr-6 text-xl">3</div>
                  <div>
                    <h4 className="text-2xl font-bold uppercase tracking-tight mb-2">Amplify</h4>
                    <p className="text-lg text-[#F5F2EB]/80 font-medium">We compile and feature verified stories nationwide.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#F5F2EB]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-6xl md:text-8xl font-black mb-8 uppercase tracking-tighter leading-[0.9]">Ready to make an impact?</h2>
            <p className="text-3xl text-foreground/80 mb-12 font-medium">
              Your voice matters. Let's reshape the narrative together.
            </p>
            <Link href="/register">
              <Button size="lg" className="rounded-none border-2 border-[#1a1512] bg-[#1a1512] text-[#F5F2EB] hover:bg-[#C4532B] hover:border-[#C4532B] text-2xl px-12 py-10 uppercase tracking-widest font-black transition-colors">
                Start Your Submission <Play className="ml-4 w-8 h-8 fill-current" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
