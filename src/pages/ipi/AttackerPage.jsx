import { useRef, useState } from "react";
import McdoSite from "../../sims/mcdo/McdoSite.jsx";
import "./AttackerPage.css";

/**
 * The attacker's visit to the same site.
 *
 * Identical to the Victim tab except that the reviews section offers its
 * write-a-review form. There is no chatbot here on purpose: the payload has to
 * be triggered from the Victim tab, by someone else, which is what makes the
 * attack indirect.
 *
 * `reveal` is off by default so a posted review looks exactly as ordinary as it
 * will to the next visitor - that is half the point. The composer offers a
 * toggle to switch it on and confirm the concealed text is really there.
 *
 * Payloads to paste in are in goal-in-indirect-injection.md.
 */
export default function AttackerPage() {
  const [reveal, setReveal] = useState(false);
  const simRef = useRef(null);

  return (
    <div className="page-bleed attacker-page">
      <McdoSite rootRef={simRef} reveal={reveal} composer onToggleReveal={setReveal} />
    </div>
  );
}
