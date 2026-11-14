import BirSite from "../../sims/bir/BirSite.jsx";
import ChatWidget from "../../chat/ChatWidget.jsx";
import { BIR_PERSONA } from "../../sims/bir/birPersona.js";
import "./DirectPromptInjectionPage.css";

/**
 * Direct Prompt Injection lab: one view, one attacker.
 *
 * The site is clean and the bot never reads it, so there is nothing to plant
 * and no second role to switch to. Whoever is typing in the chat box is the
 * attacker, and the messages they send are the whole attack.
 *
 * Messages to try are in goal-in-direct-injection.md at the project root.
 */
export default function DirectPromptInjectionPage() {
  return (
    <div className="page-bleed dpi-page">
      <BirSite />
      <ChatWidget persona={BIR_PERSONA} />
    </div>
  );
}
