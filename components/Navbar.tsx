"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, Search } from "lucide-react";

export default function Navbar() {
    const { scrollYProgress } = useScroll();

    // Fade in after a small scroll
    const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.05], [-20, 0]);

    return (
        <motion.nav
            style={{ opacity, y }}
            className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-500"
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-b border-white/10 pointer-events-none" />

            {/* Local Content Container to sit above the background */}
            <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-xl font-bold tracking-[0.2em] text-white">
                    ROLLS-ROYCE <span className="font-light text-white/60 text-sm align-top">MOTOR CARS</span>
                </div>

                <div className="hidden md:flex gap-8 text-xs font-medium tracking-widest text-white/80 uppercase">
                    <a href="#" className="hover:text-white transition-colors">Overview</a>
                    <a href="#" className="hover:text-white transition-colors">Engineering</a>
                    <a href="#" className="hover:text-white transition-colors">Bespoke</a>
                    <a href="#" className="hover:text-white transition-colors">Performance</a>
                    <a href="#" className="hover:text-white transition-colors">Gallery</a>
                </div>

                <div className="flex items-center gap-6">
                    <button className="hidden md:block px-6 py-2 bg-blue-600/80 hover:bg-blue-500 text-white text-xs font-bold rounded-full backdrop-blur-md transition-all shadow-lg hover:shadow-blue-500/30 uppercase tracking-wider">
                        Order Now
                    </button>

                    <div className="flex gap-4 text-white/80">
                        <Search className="w-5 h-5 cursor-pointer hover:text-white" />
                        <Menu className="w-5 h-5 cursor-pointer hover:text-white md:hidden" />
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
