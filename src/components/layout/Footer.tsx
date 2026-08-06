import Link from "next/link";

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
export function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 py-16 relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] opacity-[0.03] pointer-events-none" 
           style={{ background: 'radial-gradient(ellipse at top, #FF9933 0%, transparent 70%)' }}></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="font-heading font-black text-3xl tracking-tighter text-[#1A1A1A] inline-block">
              GENZ WITH THE NATION<span className="text-[#FF9933]">.</span>
            </Link>
            <p className="text-[15px] leading-relaxed max-w-sm text-[#1A1A1A]/60 font-medium">
              A digital revolution for the generation that the system forgot to count. Zero sponsors. One large, stubborn swarm.
            </p>
          </div>

          {/* Spacing for layout */}
          <div className="lg:col-span-2 hidden lg:block"></div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="font-bold text-[#1A1A1A] tracking-wider uppercase text-xs">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="#about" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors text-[14px] font-medium">About Campaign</Link></li>
              <li><Link href="#why" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors text-[14px] font-medium">Why Join</Link></li>
              <li><Link href="#timeline" className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors text-[14px] font-medium">Timeline</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-bold text-[#1A1A1A] tracking-wider uppercase text-xs">Connect</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/genzwithnation/?hl=en" target="_blank" rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#E1306C] hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#E1306C]/20 transition-all duration-300 group">
                <Instagram className="w-5 h-5 text-[#1A1A1A]/70 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592744646258" target="_blank" rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1877F2]/20 transition-all duration-300 group">
                <Facebook className="w-5 h-5 text-[#1A1A1A]/70 group-hover:text-white transition-colors" />
              </a>
            </div>
            <p className="text-[13px] text-[#1A1A1A]/50 font-medium">Follow us for updates & announcements.</p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[13px] text-[#1A1A1A]/50 font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} GenZWithTheNation Campaign. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-[13px] text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors font-medium">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
