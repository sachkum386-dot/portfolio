"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize, Minimize, ZoomIn, ZoomOut, RotateCcw, } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  images: StaticImageData[];
  title: string;
}

export function Lightbox({ images, title }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 5));
  };

  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.25, 1);

      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }

      return next;
    });
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setIsFullscreen(false);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Key listeners for modal controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeLightbox, handlePrev, handleNext]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  useEffect(() => {
    resetZoom();
  }, [currentIndex]);
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;

    setIsDragging(true);

    setStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") {
        zoomIn();
      }

      if (e.key === "-") {
        zoomOut();
      }

      if (e.key === "0") {
        resetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <div className="space-y-6">
      {/* Gallery Title Grid */}
      <h3 className="text-xl font-bold font-mono uppercase tracking-tight">Screenshots Gallery</h3>

      {/* Responsive Grid list of screenshots */}
      {images && images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[2/3] w-full rounded-lg overflow-hidden border border-card-border bg-card cursor-pointer focus:outline-none focus:ring-2 focus:ring-card-accent"
              aria-label={`View screenshot ${idx + 1} of ${title}`}
            >
              <Image
                src={img}
                alt={`${title} screenshot ${idx + 1}`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="px-2.5 py-1 text-[10px] font-mono bg-card text-foreground rounded border border-card-border shadow-sm">
                  Enlarge
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full py-10 text-center text-gray-500 border border-card-border rounded-lg">
          No images available
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshot lightbox`}
          >
            {/* Upper Action Controls */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">

              <button
                onClick={zoomOut}
                className="p-2 rounded bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800"
              >
                <ZoomOut className="w-5 h-5" />
              </button>

              <span className="px-2 text-sm text-white font-mono">
                {Math.round(scale * 100)}%
              </span>

              <button
                onClick={zoomIn}
                className="p-2 rounded bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <button
                onClick={resetZoom}
                className="p-2 rounded bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={closeLightbox}
                className="p-2 rounded bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* Bottom Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400">
              IMAGE {currentIndex + 1} OF {images.length}
            </div>

            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:bg-neutral-800 hover:scale-105 transition-all z-50"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image View */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onWheel={handleWheel}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative overflow-hidden flex items-center justify-center ${isFullscreen
                ? "w-screen h-screen"
                : "w-full max-w-5xl aspect-video"
                }`}
            >
              <motion.div
                onMouseDown={handleMouseDown}
                animate={{
                  scale,
                  x: position.x,
                  y: position.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  cursor:
                    scale > 1
                      ? isDragging
                        ? "grabbing"
                        : "grab"
                      : "default",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${title} enlarged screenshot ${currentIndex + 1}`}
                  fill
                  priority
                  draggable={false}
                  className="object-contain select-none pointer-events-none"
                  sizes="100vw"
                />
              </motion.div>
            </motion.div>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:bg-neutral-800 hover:scale-105 transition-all z-50"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Lightbox;
