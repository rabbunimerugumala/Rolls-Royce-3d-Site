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
                className="absolute bottom-0 w-full py-8 bg-black/90 backdrop-blur-xl border-t border-white/10 text-center text-white/40 text-xs z-20 flex flex-col gap-4 items-center justify-center pb-10"
            >
                <div className="flex gap-6 uppercase tracking-widest text-[10px] hover:text-white/60 transition-colors cursor-pointer">
                    <span>Privacy Policy</span>
                    <span>Terms of Use</span>
                    <span>Cookies</span>
                    <span>Legal</span>
                </div>
                <p>&copy; {new Date().getFullYear()} Rolls-Royce Motor Cars. Tribute Project.</p>
            </motion.footer>
        </main>
    );
}
