import re

with open("src/app/page.tsx", "r") as f:
    content = f.read()

start_marker = '{/* Horizontal List Layout */}'
end_marker = '          </div>\n        </div>\n      </section>'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx)

if start_idx != -1 and end_idx != -1:
    new_layout = """{/* Horizontal List Layout */}
          <div className="flex flex-col w-full border-t border-black/10 relative mt-10">
            {[
              { 
                title: "SALUTE TO OUR ARMED FORCES", 
                tags: ["Tribute", "Security", "Everyday Heroes"],
                color: "group-hover:text-[#FF9933]",
                bgAccent: "bg-[#FF9933]",
                gradient: "from-[#FF9933]/80 via-[#FF9933]/20 to-transparent",
                icon: <ShieldAlert className="w-20 h-20 text-white" />
              },
              { 
                title: "78 YEARS OF INDEPENDENCE", 
                tags: ["Journey", "Vision", "Future"],
                color: "group-hover:text-[#138808]",
                bgAccent: "bg-[#138808]",
                gradient: "from-[#138808]/80 via-[#138808]/20 to-transparent",
                icon: <Star className="w-20 h-20 text-white" />
              },
              { 
                title: "CIVIC DUTIES", 
                tags: ["Citizenship", "Responsibility", "Stronger India"],
                color: "group-hover:text-[#000080]",
                bgAccent: "bg-[#000080]",
                gradient: "from-[#000080]/80 via-[#000080]/20 to-transparent",
                icon: <CheckCircle2 className="w-20 h-20 text-white" />
              },
              { 
                title: "ROLE OF GEN Z IN DEVELOPED INDIA", 
                tags: ["Innovation", "Culture", "Progress"],
                color: "group-hover:text-[#1A1A1A]",
                bgAccent: "bg-[#1A1A1A]",
                gradient: "from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent",
                icon: <Zap className="w-20 h-20 text-white" />
              },
              { 
                title: "SUPER HEROES OF OUR SOCIETY", 
                tags: ["Service", "Community", "Champions"],
                color: "group-hover:text-[#C4532B]",
                bgAccent: "bg-[#C4532B]",
                gradient: "from-[#C4532B]/80 via-[#C4532B]/20 to-transparent",
                icon: <Users className="w-20 h-20 text-white" />
              }
            ].map((theme, i) => (
              <div 
                key={i}
                onMouseEnter={() => setHoveredTheme(i)}
                onMouseLeave={() => setHoveredTheme(null)}
                className="group relative flex flex-col py-10 md:py-16 border-b border-black/10 cursor-pointer overflow-hidden"
              >
                {/* Title and Arrow */}
                <div className="flex justify-between items-center z-10 w-full">
                  <h3 
                    className={`text-4xl md:text-6xl lg:text-[7.5rem] font-bold uppercase transition-colors duration-500 text-[#1A1A1A] ${theme.color} leading-[0.8] tracking-tighter`}
                    style={{ fontFamily: "'Formula Condensed', Impact, sans-serif" }}
                  >
                    {theme.title}
                  </h3>
                  <div className={`opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out ${theme.color}`}>
                    <ArrowUpRight className="w-10 h-10 md:w-16 md:h-16 stroke-[1.5]" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-8 z-10">
                  {theme.tags.map((tag, j) => (
                    <span 
                      key={j} 
                      className={`px-5 py-2 text-sm md:text-base font-medium rounded-full transition-colors duration-300 ${
                        j === 0 
                          ? `bg-[#1A1A1A] text-white group-hover:${theme.bgAccent.replace('bg-', 'bg-')} group-hover:text-white`
                          : 'bg-transparent border border-black/10 text-[#1A1A1A]/70 group-hover:border-black/30 group-hover:text-[#1A1A1A]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Floating Image (Glassmorphism Card) */}
                <AnimatePresence>
                  {hoveredTheme === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10, x: 100, y: '-50%' }}
                      animate={{ opacity: 1, scale: 1, rotate: 6, x: 0, y: '-50%' }}
                      exit={{ opacity: 0, scale: 0.8, rotate: -10, x: 100, y: '-50%' }}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                      className="absolute right-0 lg:right-[5%] top-1/2 pointer-events-none z-20 hidden md:block"
                    >
                      <div className={`relative w-[300px] h-[220px] lg:w-[450px] lg:h-[320px] ${theme.bgAccent} rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex items-center justify-center border border-white/20 backdrop-blur-md`}>
                        {/* Animated Glow */}
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className={`absolute w-[150%] h-[150%] bg-gradient-to-br ${theme.gradient} opacity-80 blur-3xl mix-blend-screen`}
                        />
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                        {/* Icon */}
                        <motion.div 
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="relative z-10 drop-shadow-2xl"
                        >
                          {theme.icon}
                        </motion.div>
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
    print("Successfully enhanced layout.")
else:
    print("Could not find markers.")
