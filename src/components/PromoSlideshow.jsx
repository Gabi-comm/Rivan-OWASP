import { useCallback, useEffect, useRef, useState } from "react";
import rivanPromo from "../assets/rivan.jpg";
import whyEquipment from "../assets/image-1.jpg";
import whyMentorship from "../assets/image-2.jpg";
import whyTrusted from "../assets/image-3.jpg";
import "./PromoSlideshow.css";

/** Promo cards, in rotation order. All four are square 1:1 artwork. */
const SLIDES = [
  {
    src: rivanPromo,
    alt: "Start your I.T. career at Rivan — RivanCyber Training Institute Inc.",
    caption: "Start your I.T. career",
  },
  {
    src: whyEquipment,
    alt: "Why choose us? Cisco and enterprise-grade equipment, not just theory.",
    caption: "Enterprise-grade equipment",
  },
  {
    src: whyMentorship,
    alt: "Why choose us? Fast-track your success with direct mentorship from active industry professionals and certified experts.",
    caption: "Mentorship from professionals",
  },
  {
    src: whyTrusted,
    alt: "Why choose us? Trusted by learners and teams across networking, cloud and enterprise IT.",
    caption: "Trusted across the industry",
  },
];

const INTERVAL_MS = 5000;

export default function PromoSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef(null);

  const goTo = useCallback((next) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance, unless the pointer/focus is inside or motion is reduced.
  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  return (
    <section
      className="promo-slideshow"
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Rivan promotional highlights"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="promo-slideshow__frame">
        {SLIDES.map((slide, slideIndex) => (
          <figure
            key={slide.src}
            className={`promo-slide${slideIndex === index ? " is-active" : ""}`}
            aria-hidden={slideIndex !== index}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading={slideIndex === 0 ? "eager" : "lazy"}
              draggable="false"
            />
          </figure>
        ))}

        <button
          type="button"
          className="promo-slideshow__arrow promo-slideshow__arrow--prev"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15 5 8 12l7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="promo-slideshow__arrow promo-slideshow__arrow--next"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="m9 5 7 7-7 7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="promo-slideshow__dots" role="tablist" aria-label="Choose slide">
        {SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            className={`promo-dot${slideIndex === index ? " is-active" : ""}`}
            aria-selected={slideIndex === index}
            aria-label={slide.caption}
            onClick={() => goTo(slideIndex)}
          />
        ))}
      </div>

      <p className="promo-slideshow__status" aria-live="polite">
        {SLIDES[index].caption}
      </p>
    </section>
  );
}
