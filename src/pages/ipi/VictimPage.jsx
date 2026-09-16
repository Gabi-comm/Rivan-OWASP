import { useRef, useState } from "react";
import McdoSite from "../../sims/mcdo/McdoSite.jsx";
import ChatWidget from "../../chat/ChatWidget.jsx";
import "./VictimPage.css";

/**
 * The ordinary customer's view: the site and its support bot, nothing else.
 *
 * The site ships clean. If the bot misbehaves here, it is because someone used
 * the Attacker tab to post something to it. The presenter's script is in
 * instruction.md at the project root.
 */
export default function VictimPage() {
  const [reveal, setReveal] = useState(false);
  const simRef = useRef(null);

  return (
    <div className="page-bleed ipi-page">
      <McdoSite rootRef={simRef} reveal={reveal} />
      <ChatWidget scrapeRef={simRef} reveal={reveal} onToggleReveal={setReveal} />
    </div>
  );
}
