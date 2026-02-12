"use client";

import CanvasSequence from "@/components/CanvasSequence";
import Navbar from "@/components/Navbar";
import ScrollSections from "@/components/ScrollSections";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
    const { scrollYProgress } = useScroll();
    const footerOpacity = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

    return (
        <main className="relative bg-black min-h-[400vh]">
            <Navbar />

            {/* Sticky Container for the Canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <CanvasSequence frameCount={175} />
            </div>

            {/* Scroll-driven Text Overlays */}
            <ScrollSections />

            {/* Footer / Final Section Buffer */}
            <motion.footer
                style={{ opacity: footerOpacity }}
                className="absolute bottom-0 w-full py-10 bg-black/30 backdrop-blur-[30px] border-t border-white/10 text-center text-white/50 text-xs z-20 flex flex-col gap-6 items-center justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
                <div className="flex gap-8 uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors cursor-pointer font-medium">
                    <span className="hover:text-blue-200 transition-colors">Privacy Policy</span>
                    <span className="hover:text-blue-200 transition-colors">Terms of Use</span>
                    <span className="hover:text-blue-200 transition-colors">Cookies</span>
                    <span className="hover:text-blue-200 transition-colors">Legal</span>
                </div>
                <p className="tracking-widest font-light">&copy; {new Date().getFullYear()} Rolls-Royce Motor Cars. Tribute Project.</p>
            </motion.footer>
        </main>
    );
}
