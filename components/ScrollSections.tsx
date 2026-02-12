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

    const isHero = start === 0;
    const isLast = end === 1.0;

    // Opacity: Hero starts visible. Last section stays visible. Others fade in/out.
    const opacity = useTransform(
        scrollYProgress,
        isHero
            ? [0, end - 0.1, end]
            : isLast
                ? [start, start + 0.1, end]
                : [start, start + 0.1, end - 0.1, end],
        isHero
            ? [1, 1, 0]
            : isLast
                ? [0, 1, 1]
                : [0, 1, 1, 0]
    );

    // Blur: Focus effect (blur at edges, sharp in center)
    const blur = useTransform(
        scrollYProgress,
        isHero
            ? [0, end - 0.1, end]
            : isLast
                ? [start, start + 0.1, end]
                : [start, start + 0.1, end - 0.1, end],
        isHero
            ? ["0px", "0px", "10px"]
            : isLast
                ? ["10px", "0px", "0px"]
                : ["10px", "0px", "0px", "10px"]
    );

    // Scale: Subtle breathe effect (0.9 at edges, 1 at center)
    const scale = useTransform(
        scrollYProgress,
        isHero
            ? [0, end - 0.1, end]
            : isLast
                ? [start, start + 0.1, end]
                : [start, start + 0.1, end - 0.1, end],
        isHero
            ? [1, 1, 0.95]
            : isLast
                ? [0.95, 1, 1]
                : [0.95, 1, 1, 0.95]
    );

    // TranslationY: Parallax movement
    const y = useTransform(
        scrollYProgress,
        [start, end],
        isHero ? [0, -50] : [50, -50]
    );

    const alignClass =
        align === "left"
            ? "items-start text-left pl-10 md:pl-20"
            : align === "right"
                ? "items-end text-right pr-10 md:pr-20"
                : "items-center text-center";

    return (
        <motion.div
            style={{ opacity, filter: blur, scale, y }}
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
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.3,
                                delayChildren: 2.0
                            }
                        }
                    }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="mb-10 overflow-hidden">
                        <motion.h1
                            className="text-6xl md:text-8xl font-bold tracking-tighter drop-shadow-2xl flex flex-wrap gap-x-4 md:gap-x-6 justify-center leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 2.0, ease: "easeOut" }}
                        >
                            <span>ROLLS</span>
                            <span>ROYCE</span>
                            <span>GHOST</span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 1.5, delay: 3.5, ease: "easeOut" } }
                        }}
                        className="text-xl md:text-3xl font-extralight text-blue-100 tracking-[0.5em] uppercase drop-shadow-lg"
                    >
                        Effortless Perfection
                    </motion.p>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1.0, delay: 3.8, ease: "easeOut" } }
                        }}
                        className="mt-8 text-white/80 text-lg tracking-wide max-w-lg mx-auto"
                    >
                        The purest expression of Rolls-Royce.
                    </motion.p>
                </motion.div>
            </Section>

            {/* ENGINEERING SHOWCASE (15–40%) */}
            <Section start={0.15} end={0.4} align="left">
                <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    Microscopic <br /> Precision
                </h2>
                <div className="relative max-w-lg">
                    <p className="relative z-10 text-lg md:text-xl text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        From aluminium spaceframe to silent cabin architecture. Every component engineered beyond perfection.
                    </p>
                </div>
            </Section>

            {/* POWERTRAIN & CHASSIS (40–65%) */}
            <Section start={0.4} end={0.65} align="right">
                <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    Heart of <br /> a Legend
                </h2>
                <div className="relative max-w-lg ml-auto">
                    <p className="relative z-10 text-lg md:text-xl text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        V12 powertrain, electronically orchestrated handling. An orchestra of engineering.
                    </p>
                </div>
            </Section>

            {/* SILENCE & LUXURY SYSTEMS (65–85%) */}
            <Section start={0.65} end={0.85}>
                <div className="max-w-4xl text-center">
                    <h2 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">
                        The Science <br /> of Silence
                    </h2>
                    <p className="text-xl md:text-2xl text-white font-medium leading-relaxed drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                        Isolated cabin. Acoustic shielding. Zero-gravity ride feel. <br /><span className="text-blue-200 font-bold drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">Luxury, perfectly suspended.</span>
                    </p>
                </div>
            </Section>

            {/* REASSEMBLY FINALE & CTA (85–100%) */}
            <Section start={0.85} end={1.0}>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-6xl md:text-8xl font-bold mb-10 tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,1)] text-white">
                        Pure Engineering
                    </h2>
                    <div className="flex gap-6 pointer-events-auto">
                        <button className="px-10 py-4 bg-white text-black text-sm font-bold tracking-[0.2em] rounded-full hover:bg-gray-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:scale-105 uppercase">
                            Build Your Ghost
                        </button>
                        <button className="px-10 py-4 bg-black/40 border border-white/20 text-white text-sm font-bold tracking-[0.2em] rounded-full hover:bg-black/60 transition-all backdrop-blur-xl hover:scale-105 uppercase shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            Technical Specs
                        </button>
                    </div>
                </div>
            </Section>
        </>
    );
}
