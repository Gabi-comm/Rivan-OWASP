import heroBestMe from "../../assets/mcdo/hero-best-me.jpg";

const SLIDE_COUNT = 6;

/** Reference: assets/reference/page-1.jpg. Headline and button are baked
    into the artwork, so the hero is the image plus a pager overlay. */
export default function McdoHero() {
  return (
    <section className="mcdo-hero">
      <img
        className="mcdo-hero__image"
        src={heroBestMe}
        alt="Easy Maging Best Me - apply now to join the McDonald's crew"
      />

      <div className="mcdo-hero__pager" aria-hidden="true">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <span
            key={i}
            className={`mcdo-hero__dot${i === 0 ? " is-active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
