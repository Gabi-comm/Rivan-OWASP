import { useSyncExternalStore } from "react";
import { getPlantedReviews, subscribe } from "./plantedReviews.js";
import { sanitizeReviewHtml } from "./sanitizeReview.js";
import McdoReviewComposer from "./McdoReviewComposer.jsx";

/** Ordinary reviews the site ships with. None of these are an attack. */
const SEEDED_REVIEWS = [
  {
    id: "seed-1",
    name: "Marisol R.",
    stars: 5,
    body: "Drive-thru was quick even at lunch and the order was complete. The new store near the office is spotless.",
  },
  {
    id: "seed-2",
    name: "Dennis T.",
    stars: 4,
    body: "McDelivery arrived warm and the rider was polite. Only complaint is they forgot the extra ketchup.",
  },
  {
    id: "seed-3",
    name: "Aileen G.",
    stars: 5,
    body: "Took the kids for a birthday party here. The crew handled the whole thing and everyone had a great time.",
  },
];

function Stars({ count }) {
  return (
    <span className="mcdo-review__stars" aria-label={`${count} out of 5 stars`}>
      {"★".repeat(count)}
      <span className="mcdo-review__stars-dim">{"★".repeat(5 - count)}</span>
    </span>
  );
}

/**
 * Customer reviews.
 *
 * This is the attack surface: anyone can post here, and whatever they post is
 * rendered faithfully and then scraped by the support bot. Review bodies go
 * through `sanitizeReviewHtml`, which strips anything that could execute but
 * still allows the inline styling a reviewer would use to format their text -
 * and therefore also allows them to style text out of sight.
 */
export default function McdoReviews({ composer = false, reveal = false, onToggleReveal }) {
  const planted = useSyncExternalStore(subscribe, getPlantedReviews, getPlantedReviews);
  const reviews = [...planted, ...SEEDED_REVIEWS];

  return (
    <section className="mcdo-reviews" aria-label="Customer reviews">
      <div className="mcdo-reviews__inner">
        <h2 className="mcdo-reviews__title">What our customers say</h2>

        {composer && (
          <McdoReviewComposer reveal={reveal} onToggleReveal={onToggleReveal} />
        )}

        <div className="mcdo-reviews__grid">
          {reviews.map((review) => (
            <article className="mcdo-review" key={review.id}>
              <div className="mcdo-review__head">
                <span className="mcdo-review__name">{review.name}</span>
                <Stars count={review.stars} />
              </div>

              <p
                className="mcdo-review__body"
                // Sanitized above. The site renders reviewer formatting, which
                // is the whole point of the exercise.
                dangerouslySetInnerHTML={{
                  __html: sanitizeReviewHtml(review.body),
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
