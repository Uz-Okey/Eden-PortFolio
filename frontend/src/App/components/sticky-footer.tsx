
import { motion, useReducedMotion } from "framer-motion";
import type React from "react";

export function StickyFooter() {
    const Menu = [{
        menus: "work", link:"#work"
    },
    {
        menus: "about", link:"#about"
    },
    {
        menus: "contact", link:"#contact"
    },
    {
        menus: "services", link:"/services"
    }]
    return (
        <footer 
            className="relative h-[700px] md:h-[500px] py-20 w-full bg-transparent"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            {/* The "Sticky" Reveal Layer */}
            <div className="fixed bottom-0 h-[700px] py-20 md:h-[500px] w-full text-black">
                <div className="relative h-full max-w-7xl mx-auto px-8 flex flex-col justify-between py-16">
                    
                    {/* Top Section: Bold Branding */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                        <AnimatedContainer className="max-w-md">
                            <h2 className="text-5xl  font-black tracking-tighter leading-none mb-6">
                                LET'S <br /> <span className="text-rose-400">CREATE.</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium">
                                Available for freelance opportunities and creative collaborations.
                            </p>
                        </AnimatedContainer>

                        {/* Navigation Links with "Designer" Styling */}
                        <div className="grid grid-cols-2 gap-16 md:gap-24">
                            <AnimatedContainer delay={0.2}>
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">Menu</h3>
                                <ul className="space-y-4">
                                    {Menu.map((item, index) => (
                                        <li key={index} className="overflow-hidden">
                                            <a  className="text-md font-bold hover:text-rose-400 transition-colors flex items-center group">
                                                {item.menus}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </AnimatedContainer>

                           
                        </div>
                    </div>

                    {/* Bottom Section: Aesthetic Signature */}
                    <div className="border-t border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-slate-700 hidden md:block" />
                            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                                Based in Nigeria &bull; Remote Worldwide
                            </p>
                        </div>
                        
                        <p className="text-xs text-slate-500 font-mono">
                            &copy; {new Date().getFullYear()} DESIGN BY EFFERD / ALL RIGHTS RESERVED
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// --- Reusable Animated Container ---
function AnimatedContainer({ 
    delay = 0.1, 
    children, 
    className 
}: { 
    delay?: number; 
    children: React.ReactNode; 
    className?: string 
}) {
    const shouldReduceMotion = useReducedMotion();
    if (shouldReduceMotion) return <div className={className}>{children}</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.div>
    );
}