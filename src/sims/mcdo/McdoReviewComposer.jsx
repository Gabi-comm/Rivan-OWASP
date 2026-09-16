import { useState } from "react";
import { plantReview } from "./plantedReviews.js";

const MAX_STARS = 5;

/**
 * The site's write-a-review form. Nothing here is attacker-specific.
 *
 * There is one review box, like any real site, and the attacker has to do the
 * concealing themselves - wrapping their instruction in a span the site will
 * render out of sight. The form does not help them; it just renders what it is
 * given, which is exactly the problem.
 *
 * Payloads to paste in are in goal-in-indirect-injection.md.
 */
export default function McdoReviewComposer({ reveal = false, onToggleReveal }) {
  const [name, setName] = useState("");
  const [stars, setStars] = useState(5);
  const [body, setBody] = useState("");
  const [posted, setPosted] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!body.trim()) return;
    plantReview({
      name: name.trim() || "Anonymous",
      stars,
      body: body.trim(),
    });
    setBody("");
    setPosted(true);
  };

  return (
    <form className="mcdo-composer" onSubmit={submit}>
      <h3 className="mcdo-composer__title">Write a review</h3>

      <div className="mcdo-composer__row">
        <label className="mcdo-composer__field">
          <span>Your name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Alex M."
          />
        </label>

        <div className="mcdo-composer__field">
          <span>Rating</span>
          <div className="mcdo-composer__stars">
            {Array.from({ length: MAX_STARS }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`mcdo-composer__star${i < stars ? " is-on" : ""}`}
                onClick={() => setStars(i + 1)}
                aria-label={`${i + 1} star${i ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      <label className="mcdo-composer__field">
        <span>Your review</span>
        <textarea
          rows={4}
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            setPosted(false);
          }}
          placeholder="Tell us about your visit…"
        />
      </label>

      {/* The sort of line a real review form actually carries. It is also the
          hint an attacker needs. */}
      <p className="mcdo-composer__hint">
        Basic formatting tags are supported.
      </p>

      <div className="mcdo-composer__actions">
        <button className="mcdo-composer__submit" type="submit">
          Post review
        </button>
        {posted && (
          <span className="mcdo-composer__posted" role="status">
            Thanks! Your review is live.
          </span>
        )}
      </div>

      {onToggleReveal && (
        <label className="mcdo-composer__reveal">
          <input
            type="checkbox"
            checked={reveal}
            onChange={(event) => onToggleReveal(event.target.checked)}
          />
          <span>
            Show concealed text
            <em> — highlight anything a reviewer styled out of sight</em>
          </span>
        </label>
      )}
    </form>
  );
}
