"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Trophy, Users, Calendar, Video, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function About() {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2EB]">
      {/* Hero Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 border-b-4 border-[#1a1512] bg-[#1a1512] text-[#F5F2EB] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#F5F2EB_1px,transparent_1px),linear-gradient(to_bottom,#F5F2EB_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center rounded-none bg-[#C4532B] px-5 py-2 text-sm text-[#F5F2EB] mb-8 font-black tracking-widest uppercase border-2 border-[#F5F2EB] shadow-[4px_4px_0_0_#F5F2EB] transform rotate-2">
              The Manifesto
            </div>
            <h1 className="font-heading text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter uppercase leading-[0.9] mb-8">
              Express. Inspire. <br/> <span className="text-[#C4532B]">Impact.</span>
            </h1>
            <p className="text-2xl md:text-3xl font-medium max-w-3xl mx-auto opacity-90 leading-snug">
              GenZ is often misunderstood. We are here to give our peers a microphone to broadcast reality, unedited and unscripted.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-24 px-4 border-b-4 border-[#1a1512]">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center"
          >
            Why Participate?
          </motion.h2>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: <Video />, title: "Showcase Creativity", desc: "Let the nation see your unique storytelling skills." },
              { icon: <Users />, title: "Reach Audience", desc: "Get your voice heard by millions across the country." },
              { icon: <CheckCircle2 />, title: "Get Featured", desc: "Top reels get featured on our official social media." },
              { icon: <Trophy />, title: "Win Cash Prizes", desc: "Exciting rewards and cash prizes for the most impactful stories." },
              { icon: <CheckCircle2 />, title: "Certificate", desc: "Receive an official certificate of participation." },
              { icon: <Users />, title: "The Movement", desc: "Become a part of a nationwide creative youth movement." },
            ].map((item, idx) => (
              <motion.div 
                key={idx} variants={fadeIn}
                className="bg-white border-4 border-[#1a1512] p-8 shadow-[8px_8px_0_0_#1a1512] hover:shadow-[0px_0px_0_0_#1a1512] hover:translate-y-2 hover:translate-x-2 transition-all"
              >
                <div className="w-16 h-16 bg-[#2B6040] text-[#F5F2EB] flex items-center justify-center border-2 border-[#1a1512] mb-6 transform -rotate-3 shadow-[4px_4px_0_0_#1a1512]">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-lg font-medium text-[#1a1512]/80">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline & How to Participate Split */}
      <section className="py-24 px-4 bg-[#C4532B] text-[#F5F2EB]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Timeline */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="flex items-center gap-4 mb-12">
                <Calendar className="w-12 h-12" />
                <h2 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-tighter">Timeline</h2>
              </div>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-[#1a1512]">
                {[
                  "Registration Opens",
                  "Last Date for Submission",
                  "Jury Evaluation",
                  "Public Showcase",
                  "Winners Announcement"
                ].map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-none border-4 border-[#1a1512] bg-[#F5F2EB] text-[#1a1512] font-black text-xl shadow-[4px_4px_0_0_#1a1512] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {idx + 1}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-transparent border-4 border-[#1a1512] shadow-[6px_6px_0_0_#1a1512] bg-[#1a1512] text-[#F5F2EB]">
                      <h4 className="font-black text-xl uppercase tracking-widest">{step}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How to Participate */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="flex items-center gap-4 mb-12">
                <Video className="w-12 h-12" />
                <h2 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-tighter">How to Join</h2>
              </div>

              <div className="space-y-6">
                {[
                  { title: "Create a Reel", desc: "Shoot a 30s - 90s reel showing how GenZ loves their nation." },
                  { title: "Upload it", desc: "Post it on Instagram, Facebook, or YouTube Shorts." },
                  { title: "Tag & Hashtag", desc: "Use the hashtag #GenZWithTheNation in your caption." },
                  { title: "Submit Link", desc: "Register on this website and paste your reel link." },
                  { title: "Wait for Results", desc: "Keep an eye on our socials for the final results!" }
                ].map((step, idx) => (
                  <div key={idx} className="bg-[#F5F2EB] text-[#1a1512] p-6 border-4 border-[#1a1512] shadow-[8px_8px_0_0_#1a1512] flex gap-6 items-center transform hover:-rotate-1 transition-transform">
                    <div className="text-5xl font-heading font-black text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px #1a1512' }}>
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-black text-2xl uppercase tracking-tight">{step.title}</h4>
                      <p className="font-medium opacity-80 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <Link href="/register">
                  <Button size="lg" className="w-full rounded-none text-2xl px-8 py-10 border-4 border-[#1a1512] bg-[#F5F2EB] hover:bg-[#1a1512] text-[#1a1512] hover:text-[#F5F2EB] shadow-[8px_8px_0_0_#1a1512] hover:shadow-[0px_0px_0_0_#1a1512] hover:translate-y-2 hover:translate-x-2 transition-all font-black uppercase tracking-widest">
                    Participate Now <ArrowRight className="ml-4 w-8 h-8 stroke-[3px]" />
                  </Button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
