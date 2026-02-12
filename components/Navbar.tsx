"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, Search } from "lucide-react";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 2.0, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-50 px-6 py-3 flex justify-between items-center transition-all duration-500"
        >
            {/* Premium Glass Background - More distinct */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.0 }}
                className="absolute inset-0 bg-white/10 backdrop-blur-[40px] border-b border-white/20 pointer-events-none shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            />

            {/* Local Content Container to sit above the background */}
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1, delayChildren: 2.0 }
                    }
                }}
            >
                <div className="flex items-baseline gap-2">
                    <motion.div
                        variants={{ hidden: { y: -10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } }}
                        className="text-2xl font-bold tracking-[0.25em] text-white drop-shadow-md"
                    >
                        ROLLS ROYCE
                    </motion.div>
                    <motion.span
                        variants={{ hidden: { x: -10, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } }}
                        className="font-light text-white/70 text-xs tracking-widest"
                    >
                        MOTOR CARS
                    </motion.span>
                </div>

                <motion.div
                    variants={{ hidden: { opacity: 0, y: -5 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                    className="hidden md:flex gap-10 text-[10px] font-medium tracking-[0.2em] text-white/90 uppercase"
                >
                    <span className="hover:text-blue-200 transition-all hover:scale-105 duration-300 cursor-default">Overview</span>
                    <span className="hover:text-blue-200 transition-all hover:scale-105 duration-300 cursor-default">Engineering</span>
                    <span className="hover:text-blue-200 transition-all hover:scale-105 duration-300 cursor-default">Bespoke</span>
                    <span className="hover:text-blue-200 transition-all hover:scale-105 duration-300 cursor-default">Performance</span>
                    <span className="hover:text-blue-200 transition-all hover:scale-105 duration-300 cursor-default">Gallery</span>
                </motion.div>

                <motion.div
                    variants={{ hidden: { opacity: 0, x: 10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                    className="flex items-center gap-8"
                >
                    <button className="hidden md:block px-8 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[10px] font-bold rounded-full backdrop-blur-md transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] uppercase tracking-[0.15em]">
                        Order Now
                    </button>

                    <div className="flex gap-6 text-white/90">
                        <Search className="w-5 h-5 cursor-pointer hover:text-blue-200 transition-colors" />
                        <Menu className="w-5 h-5 cursor-pointer hover:text-blue-200 md:hidden transition-colors" />
                    </div>
                </motion.div>
            </motion.div>
        </motion.nav>
    );
}
