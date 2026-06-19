"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    mode: "Fashion",
    eyebrow: "New Season",
    headline: "Dressed for\nEvery Moment",
    sub: "The new collection — refined essentials, recut for now.",
    cta: "Shop Women",
    href: "/women",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=90",
    overlay: "bg-gradient-to-t from-[#1A1A1A]/70 via-[#1A1A1A]/20 to-transparent",
  },
  {
    mode: "Home",
    eyebrow: "Living Edit",
    headline: "Spaces That\nFeel Like You",
    sub: "Curated home pieces for warmth, texture, and ease.",
    cta: "Shop Living",
    href: "/living",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=90",
    overlay: "bg-gradient-to-t from-[#8B6F52]/80 via-[#8B6F52]/20 to-transparent",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  // Swipe support
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(420px, 85vh, 800px)" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <img src={s.image} alt={s.mode} className="w-full h-full object-cover object-center" />
          <div className={`absolute inset-0 ${s.overlay}`} />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-10 md:px-16 lg:px-24 pb-12 sm:pb-16 md:pb-20 lg:pb-28 text-white">
        <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 bg-[#C17A56] text-white px-3 py-1 rounded-full w-fit">
          {slide.mode} — {slide.eyebrow}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-[1.1] mb-3 sm:mb-4 whitespace-pre-line">
          {slide.headline}
        </h1>
        <p className="text-xs sm:text-sm md:text-base mb-6 sm:mb-8 max-w-xs sm:max-w-sm md:max-w-md opacity-90 leading-relaxed">
          {slide.sub}
        </p>
        <a
          href={slide.href}
          className="inline-block bg-white text-[#1A1A1A] text-[10px] sm:text-xs tracking-widest uppercase px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-[#C17A56] hover:text-white transition-colors w-fit font-semibold"
        >
          {slide.cta}
        </a>
      </div>

      {/* Arrows — hidden on mobile, shown on sm+ */}
      <button onClick={prev} aria-label="Previous" className="hidden sm:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 md:p-2.5 transition-colors items-center justify-center">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} aria-label="Next" className="hidden sm:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 md:p-2.5 transition-colors items-center justify-center">
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-white w-6 sm:w-8" : "bg-white/50 w-1.5"}`}
          />
        ))}
      </div>
    </section>
  );
}
