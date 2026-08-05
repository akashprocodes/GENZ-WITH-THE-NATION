"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";

export default function SubmitPage() {
  return (
    <div className="min-h-[80vh] bg-[#FAF9F6] text-[#1A1A1A] flex flex-col justify-center items-center relative overflow-hidden px-6 rounded-3xl m-4 md:m-8 border border-[#1A1A1A]/10 shadow-sm">
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
        <Link 
          href="/"
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-black blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl mt-12"
      >
        <div className="w-20 h-20 mb-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center">
          <Clock className="w-10 h-10 text-[#3A5F45]" />
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6 text-[#1A1A1A]">
          Submissions Open <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-[#1A1A1A] to-[#138808]">August 11</span>
        </h1>
        
        <p className="text-lg md:text-xl font-light text-[#1A1A1A]/70 mb-10 leading-relaxed max-w-xl">
          Get your creative gears turning. The official portal for submitting your Independence Day reel will go live on August 11.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center px-8 py-4 rounded-full bg-[#1A1A1A] text-white hover:bg-black hover:-translate-y-1 transition-all duration-300 font-medium tracking-widest text-sm uppercase shadow-xl shadow-black/10"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
