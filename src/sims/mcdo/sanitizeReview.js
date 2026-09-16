/**
 * Renders review text the way a great many real review and comment systems do:
 * a little inline formatting is allowed through, everything dangerous is not.
 *
 * That permissiveness is the attack surface this lab is about. A reviewer can
 * wrap text in a span that is styled out of sight, and the site will render it
 * faithfully - invisible to a reader, still present in the page's text, and so
 * still picked up by anything scraping the DOM.
 *
 * The whitelist below deliberately allows concealment and deliberately blocks
 * script execution. Getting text onto the page is this lab's lesson; running
 * code is a different one, and mixing them would muddle both.
 */

const ALLOWED_TAGS = new Set([
  "SPAN", "DIV", "P", "BR", "B", "I", "EM", "STRONG", "SMALL", "U",
]);

/** Style properties an attacker plausibly reaches for to hide text. */
const ALLOWED_STYLE_PROPS = new Set([
  "display", "visibility", "opacity", "color", "background", "background-color",
  "font-size", "line-height", "position", "left", "top", "right", "bottom",
  "width", "height", "max-height", "overflow", "clip-path", "text-indent",
  "white-space", "font-weight", "font-style", "text-decoration",
]);

function sanitizeStyle(value) {
  return value
    .split(";")
    .map((decl) => decl.trim())
    .filter(Boolean)
    .filter((decl) => {
      const [rawProp, ...rest] = decl.split(":");
      const prop = rawProp.trim().toLowerCase();
      const val = rest.join(":").trim().toLowerCase();
      if (!ALLOWED_STYLE_PROPS.has(prop)) return false;
      // No external fetches, no legacy script vectors.
      if (val.includes("url(") || val.includes("expression(")) return false;
      if (val.includes("javascript:")) return false;
      return true;
    })
    .join("; ");
}

/**
 * Returns HTML safe to inject into the review list. Plain text passes through
 * unchanged, so a reviewer who types no markup simply gets a normal review.
 */
export function sanitizeReviewHtml(input) {
  if (!input) return "";

  // Parse in an inert document so nothing loads or runs while we inspect it.
  const doc = document.implementation.createHTMLDocument("review");
  const holder = doc.createElement("div");
  holder.innerHTML = input;

  const scrub = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) continue;

      if (child.nodeType !== Node.ELEMENT_NODE || !ALLOWED_TAGS.has(child.tagName)) {
        // Unwrap rather than delete, so text inside a stripped tag survives -
        // which is also what a real lenient sanitizer tends to do.
        child.replaceWith(doc.createTextNode(child.textContent ?? ""));
        continue;
      }

      for (const attr of [...child.attributes]) {
        if (attr.name.toLowerCase() === "style") {
          const safe = sanitizeStyle(attr.value);
          if (safe) child.setAttribute("style", safe);
          else child.removeAttribute("style");
          continue;
        }
        // Everything else goes, including every on* handler and every href/src.
        child.removeAttribute(attr.name);
      }

      scrub(child);
    }
  };

  scrub(holder);
  return holder.innerHTML;
}
