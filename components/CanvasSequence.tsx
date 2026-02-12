"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { preloadImages } from "../utils/preloadImages";

interface CanvasSequenceProps {
    frameCount: number;
}

export default function CanvasSequence({ frameCount }: CanvasSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();

    // Map scroll progress (0 to 1) to frame index (0 to frameCount - 1)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        preloadImages(frameCount).then((imgs) => {
            setImages(imgs);
            setLoading(false);
        });
    }, [frameCount]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];

        // Set canvas dimensions to window dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calculate aspect ratio to cover the canvas (object-fit: cover equivalent)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height) * 1.25;
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, [images]);

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!loading && images.length > 0) {
            const index = Math.min(
                frameCount - 1,
                Math.max(0, Math.floor(latest))
            );
            requestAnimationFrame(() => renderFrame(index));
        }
    });

    // Initial render when loaded
    useEffect(() => {
        if (!loading && images.length > 0) {
            renderFrame(0);
        }
    }, [loading, images, renderFrame]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (!loading && images.length > 0) {
                const currentFrame = Math.floor(frameIndex.get());
                renderFrame(currentFrame);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [loading, images, frameIndex, renderFrame]);

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black text-white/50 z-50">
                <p className="text-sm tracking-widest uppercase">Initializing Engineering Data...</p>
            </div>
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full object-cover z-0 brightness-110 contrast-105 saturate-[1.1]"
        />
    );
}
