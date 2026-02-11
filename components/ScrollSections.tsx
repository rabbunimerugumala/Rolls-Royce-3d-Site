"use client";

import { motion, useScroll, useTransform } from "framer-motion";


const Section = ({
    children,
    start,
    end,
    align = "center",
}: {
    children: React.ReactNode;
    start: number;
    end: number;
    align?: "left" | "center" | "right";
}) => {
    const { scrollYProgress } = useScroll();

    // Fade in at start, fade out at end
    const opacity = useTransform(
        scrollYProgress,
        [start, start + 0.05, end - 0.05, end],
        [0, 1, 1, 0]
    );

    // Subtle slide effect
    const y = useTransform(
        scrollYProgress,
        [start, end],
        [50, -50]
    );

    const alignClass =
        align === "left"
            ? "items-start text-left pl-10 md:pl-20"
            : align === "right"
                ? "items-end text-right pr-10 md:pr-20"
                : "items-center text-center";

    return (
        <motion.div
            style={{ opacity, y }}
            className={`fixed top-0 left-0 w-full h-full flex flex-col justify-center pointer-events-none z-10 ${alignClass}`}
        >
            {children}
        </motion.div>
    );
};

export default function ScrollSections() {
    return (
        <>
            {/* HERO / INTRO (0–15%) */}
            <Section start={0} end={0.15}>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
                    Rolls-Royce <span className="text-white/60">Ghost</span>
                </h1>
                <p className="text-xl md:text-2xl font-light text-blue-400 tracking-widest uppercase">
                    Anti-Gravity Engineering
                </p>
                <p className="mt-4 text-white/60">A new dimension of luxury begins.</p>
            </Section>

            {/* ENGINEERING SHOWCASE (15–40%) */}
            <Section start={0.15} end={0.4} align="left">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Microscopic <br /> Precision
                </h2>
                <p className="text-lg md:text-xl text-white/70 max-w-md bg-black/30 p-4 backdrop-blur-md rounded-lg border border-white/5">
                    From aluminium spaceframe to silent cabin architecture. Every component engineered beyond perfection.
                </p>
            </Section>

            {/* POWERTRAIN & CHASSIS (40–65%) */}
            <Section start={0.4} end={0.65} align="right">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Heart of <br /> a Legend
                </h2>
                <p className="text-lg md:text-xl text-white/70 max-w-md bg-black/30 p-4 backdrop-blur-md rounded-lg border border-white/5">
                    V12 powertrain, electronically orchestrated handling. An orchestra of engineering.
                </p>
            </Section>

            {/* SILENCE & LUXURY SYSTEMS (65–85%) */}
            <Section start={0.65} end={0.85}>
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    The Science of Silence
                </h2>
                <p className="text-xl text-white/70 max-w-2xl">
                    Isolated cabin. Acoustic shielding. Zero-gravity ride feel. Luxury, perfectly suspended.
                </p>
            </Section>

            {/* REASSEMBLY FINALE & CTA (85–100%) */}
            <Section start={0.85} end={1.0}>
                <h2 className="text-5xl md:text-7xl font-bold mb-8">
                    Pure Engineering
                </h2>
                <div className="flex gap-4 pointer-events-auto">
                    <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Build Your Ghost
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
                        Technical Specs
                    </button>
                </div>
            </Section>
        </>
    );
}
