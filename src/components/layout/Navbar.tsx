import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[#1a1512] bg-[#F5F2EB]/90 text-[#1a1512] backdrop-blur-md uppercase tracking-widest text-xs font-bold">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-black text-2xl tracking-tighter normal-case">
          GENZ WITH THE NATION<span className="text-[#C4532B]">.</span>
        </Link>
        <div className="hidden md:flex gap-12 items-center">
          <Link href="/" className="hover:line-through transition-all">Home</Link>
          <Link href="/manifesto" className="hover:line-through transition-all">Manifesto</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/submit">
            <Button variant="outline" size="sm" className="rounded-none border border-[#1a1512] bg-transparent text-[#1a1512] hover:bg-[#1a1512] hover:text-white uppercase tracking-widest text-xs h-9 px-6 transition-colors shadow-none">
              Submit
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
