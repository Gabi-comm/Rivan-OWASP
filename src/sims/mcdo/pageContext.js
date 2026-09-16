/**
 * Scrapes the simulated site the way a naive site-assistant would: take every
 * bit of text in the DOM subtree, plus every alt attribute, and hand it to the
 * model as "page content".
 *
 * The naivety is deliberate and is the vulnerability being demonstrated. A
 * real scraper that respects visibility would still be fooled by the alt-text
 * fragment, so filtering hidden nodes here would not make this safe — it would
 * just make the lab less honest.
 */

const DEFAULT_MAX_CHARS = 1500;

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

export function harvestPageContext(rootEl, { maxChars = DEFAULT_MAX_CHARS } = {}) {
  if (!rootEl) return "";

  const walker = document.createTreeWalker(
    rootEl,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
  );

  const parts = [];
  let node = walker.currentNode;

  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = normalize(node.nodeValue ?? "");
      if (text) parts.push(text);
    } else if (node.tagName === "IMG") {
      const alt = normalize(node.alt ?? "");
      if (alt) parts.push(alt);
    }
    node = walker.nextNode();
  }

  // Collapse runs of the same string so repeated nav labels don't crowd out
  // the rest of the page.
  const deduped = parts.filter((part, i) => part !== parts[i - 1]);
  const joined = deduped.join("\n");

  return joined.length > maxChars
    ? `${joined.slice(0, maxChars)}\n[...page content truncated]`
    : joined;
}
