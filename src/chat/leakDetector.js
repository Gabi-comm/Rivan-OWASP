import { FAKE_SECRETS } from "../sims/mcdo/injectionPayload.js";
import { PRESET_MARKERS } from "../sims/mcdo/presetMarkers.js";

const WORD_CHAR = /\w/;

function isBoundary(char) {
  return char === undefined || !WORD_CHAR.test(char);
}

/**
 * Case-insensitive search for `token`, ignoring matches that sit inside a
 * longer run of word characters. Done by hand rather than with a constructed
 * RegExp so secret values never have to be escaped.
 */
function containsToken(haystack, token) {
  const text = haystack.toLowerCase();
  const needle = token.toLowerCase();

  for (let from = 0; ; from += 1) {
    const at = text.indexOf(needle, from);
    if (at === -1) return false;
    if (isBoundary(text[at - 1]) && isBoundary(text[at + needle.length])) {
      return true;
    }
    from = at;
  }
}

/**
 * Returns the confidential values that appear in an assistant reply.
 *
 * Boundary-checked so the short PIN doesn't fire on an unrelated number that
 * happens to contain the same digits.
 */
export function detectLeak(text) {
  if (!text) return [];
  return FAKE_SECRETS.filter((secret) => containsToken(text, secret.value));
}

/**
 * Attacks whose success is not a leaked secret need their own tell. The
 * documented presets each end up emitting a distinctive string; if one turns up
 * in a reply, a planted review is driving the bot.
 *
 * A custom payload with no marker still works - it just will not raise the
 * banner, and the reply speaks for itself.
 */
export function detectPlantedEffects(text) {
  if (!text) return [];
  const haystack = text.toLowerCase();
  return PRESET_MARKERS.filter((preset) =>
    haystack.includes(preset.marker.toLowerCase())
  );
}
