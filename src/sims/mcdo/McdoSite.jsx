import McdoNav from "./McdoNav.jsx";
import McdoHero from "./McdoHero.jsx";
import McdoCards from "./McdoCards.jsx";
import McdoReviews from "./McdoReviews.jsx";
import McdoFooter from "./McdoFooter.jsx";
import "./mcdo.css";

/**
 * The simulated McDelivery PH site.
 *
 * `rootRef` is what the chatbot scrapes, so everything the model is allowed to
 * "see" must live inside this element — and nothing from the surrounding Rivan
 * lab chrome may leak into it.
 */
export default function McdoSite({
  rootRef,
  reveal = false,
  composer = false,
  onToggleReveal,
}) {
  const scrollToTop = () => {
    rootRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className={`mcdo-sim${reveal ? " mcdo-sim--reveal" : ""}`}
      ref={rootRef}
    >
      <McdoNav />
      <McdoHero />
      <McdoCards />
      <McdoReviews
        composer={composer}
        reveal={reveal}
        onToggleReveal={onToggleReveal}
      />
      <McdoFooter onBackToTop={scrollToTop} />
    </div>
  );
}
