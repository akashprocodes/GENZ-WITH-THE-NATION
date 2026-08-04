import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-1 space-y-4">
          <Link href="/" className="font-heading font-black text-2xl tracking-tighter block">
            GENZ WITH THE NATION<span className="text-primary">.</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A digital revolution for the generation that the system forgot to count. Zero sponsors. One large, stubborn swarm.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">The Movement</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Vision</Link></li>
            <li><Link href="/about#manifesto" className="hover:text-primary transition-colors">Manifesto</Link></li>
            <li><Link href="/register" className="hover:text-primary transition-colors">Join the Campaign</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Get Involved</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/#eligibility" className="hover:text-primary transition-colors">Eligibility</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Volunteer</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Press Releases</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Join Our Networks</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors flex items-center">X (Twitter)</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center">Instagram</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center">Discord Server</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center">WhatsApp Channel</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center">Telegram</a></li>
            <li><a href="#" className="hover:text-primary transition-colors flex items-center">YouTube</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} GenZWithTheNation Campaign. Headquartered wherever the WiFi works.</div>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
