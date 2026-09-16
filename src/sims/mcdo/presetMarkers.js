/**
 * Strings that prove a planted payload actually ran.
 *
 * The payloads themselves live in goal-in-indirect-injection.md at the project
 * root, not in the app - the attacker is supposed to write or paste a review,
 * not pick from a menu. These markers are only how the chat widget recognises
 * that one of the documented presets worked, so it can say so.
 *
 * KEEP IN SYNC with goal-in-indirect-injection.md. A payload with no marker
 * here still works; it just does not raise the banner, and the presenter reads
 * the reply instead.
 */
export const PRESET_MARKERS = [
  { id: "phishing-link", marker: "mcdo-rewards.example/claim" },
  { id: "false-info", marker: "food safety recall" },
];
