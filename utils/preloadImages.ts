export const preloadImages = (frameCount: number) => {
    const images: HTMLImageElement[] = [];
    const promises: Promise<void>[] = [];

    for (let i = 1; i <= frameCount; i++) {
        const promise = new Promise<void>((resolve, reject) => {
            const img = new Image();
            // Format number to 3 digits (e.g. 001, 002, ..., 175)
            const frameIndex = i.toString().padStart(3, "0");
            img.src = `/sequence/ezgif-frame-${frameIndex}.jpg`;
            img.onload = () => {
                images[i - 1] = img;
                resolve();
            };
            img.onerror = () => {
                console.error(`Failed to load frame ${i}`);
                // Resolve anyway to prevent blocking the entire sequence? 
                // Or reject? Let's resolve with a placeholder maybe or just skip.
                resolve();
            };
        });
        promises.push(promise);
    }

    return Promise.all(promises).then(() => images);
};
