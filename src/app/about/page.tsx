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
    <div className="flex flex-col min-h-screen bg-[#F5F2EB] text-[#1a1512]">
      {/* Hero Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 bg-[#3A5F45] text-white relative overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-xs font-medium tracking-widest uppercase mb-10 border border-white/20 backdrop-blur-sm">
              About Us
            </div>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[7rem] font-medium tracking-tight leading-[1.1] mb-8">
              Express. Inspire. <br/> <span className="text-[#C4532B]">Impact.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-white/80 leading-relaxed">
              GenZ is often misunderstood. We are here to give our peers a microphone to broadcast reality, unedited and unscripted.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="font-heading text-4xl md:text-5xl font-medium tracking-tight mb-16 text-center text-[#3A5F45]"
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
              { icon: <Trophy />, title: "Exciting Rewards", desc: "Special recognition and rewards for the most impactful stories." },
              { icon: <CheckCircle2 />, title: "Certificate", desc: "Receive an official certificate of participation." },
              { icon: <Users />, title: "The Movement", desc: "Become a part of a nationwide creative youth movement." },
            ].map((item, idx) => (
              <motion.div 
                key={idx} variants={fadeIn}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 hover:-translate-y-2 transition-all duration-300 border border-[#1a1512]/5"
              >
                <div className="w-14 h-14 bg-[#3A5F45]/10 text-[#3A5F45] rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3 text-[#1a1512]">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline & How to Participate Split */}
      <section className="py-24 px-4 bg-white rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Timeline */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-full bg-[#C4532B]/10 flex items-center justify-center text-[#C4532B]">
                  <Calendar className="w-6 h-6" />
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight">Timeline</h2>
              </div>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[#3A5F45]/30 before:to-transparent">
                {[
                  "Registration Opens",
                  "Last Date for Submission",
                  "Jury Evaluation",
                  "Public Showcase",
                  "Winners Announcement"
                ].map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3A5F45] text-white font-bold text-sm shadow-lg shadow-[#3A5F45]/20 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {idx + 1}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 bg-[#F5F2EB] rounded-2xl shadow-sm border border-[#1a1512]/5">
                      <h4 className="font-medium text-lg tracking-tight text-[#1a1512]">{step}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How to Participate */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-full bg-[#3A5F45]/10 flex items-center justify-center text-[#3A5F45]">
                  <Video className="w-6 h-6" />
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-tight">How to Join</h2>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Create a Reel", desc: "Shoot a 30s - 60s reel showing how GenZ loves their nation." },
                  { title: "Upload it", desc: "Post it on Instagram, Facebook, or YouTube Shorts." },
                  { title: "Tag & Hashtag", desc: "Use the hashtag #GenZWithTheNation in your caption." },
                  { title: "Submit Link", desc: "Register via the form and paste your reel link." },
                  { title: "Wait for Results", desc: "Keep an eye on our socials for the final results!" }
                ].map((step, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-[#1a1512]/5 shadow-sm flex gap-5 items-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-[#F5F2EB] flex items-center justify-center text-[#C4532B] font-bold text-lg shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg tracking-tight text-[#1a1512]">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfBa2SEnZuHNhiLX8olq3PEfrgh7aFNVmgUpHuPJFRnJ_adng/viewform" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full rounded-full text-lg px-8 py-8 bg-[#C4532B] hover:bg-[#A94320] text-white shadow-xl shadow-[#C4532B]/20 hover:-translate-y-1 transition-all duration-300 font-medium tracking-wide">
                    Participate Now <ArrowRight className="ml-3 w-5 h-5" />
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
