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
    <footer className="border-t border-border/40 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
        <div className="max-w-md space-y-4">
          <Link href="/" className="font-heading font-black text-2xl tracking-tighter block">
            GENZ WITH THE NATION<span className="text-[#C4532B]">.</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A digital revolution for the generation that the system forgot to count. Zero sponsors. One large, stubborn swarm.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4 md:text-right">Join Our Networks</h4>
          <div className="flex gap-4 md:justify-end">
            <a href="https://www.instagram.com/genzwithnation/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A] text-[#1A1A1A]/70 transition-colors flex items-center p-2 rounded-full border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 bg-[#FAF9F6]">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61592744646258" target="_blank" rel="noopener noreferrer" className="hover:text-[#1A1A1A] text-[#1A1A1A]/70 transition-colors flex items-center p-2 rounded-full border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 bg-[#FAF9F6]">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-8 border-t border-border/40 text-center text-xs text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} GenZWithTheNation Campaign. Headquartered wherever the WiFi works.</div>
      </div>
    </footer>
  );
}
