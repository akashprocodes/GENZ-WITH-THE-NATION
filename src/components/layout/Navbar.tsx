"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[#1a1512] bg-[#F5F2EB]/90 text-[#1a1512] backdrop-blur-md uppercase tracking-widest text-xs font-bold">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-black text-2xl tracking-tighter normal-case relative z-[60]" onClick={() => setIsOpen(false)}>
          GENZ WITH THE NATION<span className="text-[#C4532B]">.</span>
        </Link>
        <div className="hidden md:flex items-center">
          <div className="flex gap-12 mr-8">
            <Link href="/" className="relative group py-1">
              <span className="transition-colors duration-300 group-hover:text-[#C4532B]">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C4532B] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
            <Link href="/about" className="relative group py-1">
              <span className="transition-colors duration-300 group-hover:text-[#C4532B]">About</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C4532B] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </Link>
          </div>
          
          <div className="flex gap-5 items-center border-l border-[#1a1512]/20 pl-8">
            <a href="https://www.instagram.com/genzwithnation/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4532B] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61592744646258" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4532B] transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden relative z-[60] p-2 hover:bg-[#1a1512]/5 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#F5F2EB] z-50 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-xl">
              <Link href="/" className="hover:text-[#C4532B] transition-colors" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="hover:text-[#C4532B] transition-colors" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </div>
            <div className="flex gap-6 items-center mt-8">
              <a href="https://www.instagram.com/genzwithnation/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4532B] transition-colors p-3 rounded-full border border-[#1a1512]/10 bg-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592744646258" target="_blank" rel="noopener noreferrer" className="hover:text-[#C4532B] transition-colors p-3 rounded-full border border-[#1a1512]/10 bg-white">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
