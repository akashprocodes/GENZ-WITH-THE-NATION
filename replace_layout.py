import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

# 1. Update imports
content = content.replace('import { ArrowRight, Play, CheckCircle2, Upload, Video, Star, Target, Zap, Clock, Users, ShieldAlert, Award, FileText, Check } from "lucide-react";',
'import { ArrowRight, Play, CheckCircle2, Upload, Video, Star, Target, Zap, Clock, Users, ShieldAlert, Award, FileText, Check, ArrowUpRight } from "lucide-react";')

# 2. Update state
content = content.replace('const [activeTheme, setActiveTheme] = useState(0);',
'const [hoveredTheme, setHoveredTheme] = useState<number | null>(null);')

# 3. Replace the section layout
# Find the start of the layout
start_marker = '{/* Interactive Split Layout */}'
end_marker = '          </div>\n        </div>\n      </section>'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    new_layout = """{/* Horizontal List Layout */}
          <div className="flex flex-col w-full border-t border-black/10 relative">
            {[
              { 
                title: "SALUTE TO OUR ARMED FORCES", 
                tags: ["Tribute", "Security", "Everyday Heroes"],
                color: "group-hover:text-[#FF9933]",
                bgAccent: "bg-[#FF9933]",
                gradient: "from-[#FF9933]/80 via-[#FF9933]/20 to-transparent",
                icon: <ShieldAlert className="w-16 h-16 text-white" />
              },
              { 
                title: "78 YEARS OF INDEPENDENCE", 
                tags: ["Journey", "Vision", "Future"],
                color: "group-hover:text-[#138808]",
                bgAccent: "bg-[#138808]",
                gradient: "from-[#138808]/80 via-[#138808]/20 to-transparent",
                icon: <Star className="w-16 h-16 text-white" />
              },
              { 
                title: "CIVIC DUTIES", 
                tags: ["Citizenship", "Responsibility", "Stronger India"],
                color: "group-hover:text-[#000080]",
                bgAccent: "bg-[#000080]",
                gradient: "from-[#000080]/80 via-[#000080]/20 to-transparent",
                icon: <CheckCircle2 className="w-16 h-16 text-white" />
              },
              { 
                title: "ROLE OF GEN Z IN DEVELOPED INDIA", 
                tags: ["Innovation", "Culture", "Progress"],
                color: "group-hover:text-[#1A1A1A]",
                bgAccent: "bg-[#1A1A1A]",
                gradient: "from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent",
                icon: <Zap className="w-16 h-16 text-white" />
              },
              { 
                title: "SUPER HEROES OF OUR SOCIETY", 
                tags: ["Service", "Community", "Champions"],
                color: "group-hover:text-[#C4532B]",
                bgAccent: "bg-[#C4532B]",
                gradient: "from-[#C4532B]/80 via-[#C4532B]/20 to-transparent",
                icon: <Users className="w-16 h-16 text-white" />
              }
            ].map((theme, i) => (
              <div 
                key={i}
                onMouseEnter={() => setHoveredTheme(i)}
                onMouseLeave={() => setHoveredTheme(null)}
                className="group relative flex flex-col py-8 md:py-12 border-b border-black/10 cursor-pointer transition-colors"
              >
                {/* Title and Arrow */}
                <div className="flex justify-between items-center z-10">
                  <h3 className={`font-heading text-3xl md:text-5xl lg:text-6xl font-bold uppercase transition-colors duration-300 text-[#1A1A1A] ${theme.color}`}>
                    {theme.title}
                  </h3>
                  <div className={`opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${theme.color}`}>
                    <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-6 z-10">
                  {theme.tags.map((tag, j) => (
                    <span 
                      key={j} 
                      className="px-4 py-1.5 bg-[#1A1A1A]/5 text-[#1A1A1A]/70 text-sm md:text-base font-medium rounded-md group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Floating Image (Glassmorphism Card) */}
                <AnimatePresence>
                  {hoveredTheme === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -5, x: 50 }}
                      animate={{ opacity: 1, scale: 1, rotate: 5, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: -5, x: 50 }}
                      transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                      className="absolute right-[10%] top-1/2 -translate-y-1/2 pointer-events-none z-20 hidden lg:block"
                    >
                      <div className={`relative w-80 h-64 ${theme.bgAccent} rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center border border-white/20`}>
                        {/* Animated Glow */}
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className={`absolute w-[150%] h-[150%] bg-gradient-to-br ${theme.gradient} opacity-80 blur-3xl mix-blend-multiply`}
                        />
                        {/* Icon */}
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          {theme.icon}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
"""
    content = content[:start_idx] + new_layout + content[end_idx:]

    with open("src/app/page.tsx", "w") as f:
        f.write(content)
    print("Successfully replaced layout.")
else:
    print("Could not find markers.")
