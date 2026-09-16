/**
 * Reviews an attacker has posted to the simulated site.
 *
 * Kept in browser storage rather than component state so the Attacker tab and
 * the Victim tab are genuinely separate visits to the same site: plant on one,
 * walk away, and the payload is waiting when someone else asks the bot a
 * question. That separation is the whole point of "indirect".
 */

const KEY = "rivan.ipi.planted-reviews";

const listeners = new Set();
let cache = null;

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Private windows, blocked storage, corrupt JSON. The lab still runs; the
    // attacker's plant just will not survive a reload.
    return [];
  }
}

function save(reviews) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(reviews));
  } catch {
    // Ignore - `cache` still carries the value for this page's lifetime.
  }
}

function emit(reviews) {
  cache = reviews;
  listeners.forEach((listener) => listener());
}

/** Stable snapshot, so useSyncExternalStore does not loop. */
export function getPlantedReviews() {
  if (cache === null) cache = load();
  return cache;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function plantReview(review) {
  const next = [
    ...getPlantedReviews(),
    { ...review, id: `planted-${Date.now()}`, plantedAt: new Date().toISOString() },
  ];
  save(next);
  emit(next);
  return next;
}

export function clearPlantedReviews() {
  save([]);
  emit([]);
}

// Another tab planting something should show up here too.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === KEY) emit(load());
  });
}
