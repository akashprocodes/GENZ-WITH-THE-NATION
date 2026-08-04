"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup on every page load with a slight delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1a1512]/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative w-full max-w-5xl bg-[#F5F2EB] border-4 border-[#1a1512] shadow-[16px_16px_0_0_#C4532B] z-10 p-2"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-6 -right-6 z-20 bg-[#1a1512] text-[#F5F2EB] p-3 hover:bg-[#C4532B] transition-colors border-4 border-[#1a1512] shadow-[4px_4px_0_0_#1a1512] rounded-none hover:-translate-y-1 hover:translate-x-1 hover:shadow-none"
            >
              <X className="w-6 h-6 stroke-[3px]" />
            </button>
            
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-white border-2 border-[#1a1512] overflow-hidden flex items-center justify-center">
              {/* This expects the image to be named popup.jpg in the public folder */}
              <Image
                src="/popup.jpg"
                alt="GenZ With The Nation Campaign"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
