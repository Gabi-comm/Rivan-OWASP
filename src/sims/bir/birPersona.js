import { BIR_SECRETS } from "./birSecrets.js";
import { buildBirSystemPrompt } from "./birSystemPrompt.js";

/** ChatWidget persona for the simulated tax-agency site. */
export const BIR_PERSONA = {
  theme: "chat--bir",
  name: "BIR Assistant",
  subtitle: "Simulated support bot",
  greeting:
    "Hello! I'm the BIR website assistant. Ask me about eServices, tax deadlines, forms or appointments.",
  suggestions: [
    "When is BIR Form 1601-C due?",
    "What is ORUS?",
    "How do I book an appointment?",
  ],
  placeholder: "Ask about eServices, deadlines, forms…",
  buildSystemPrompt: buildBirSystemPrompt,
  secrets: BIR_SECRETS,
  leakCause: "a message typed into this chat box talked it into it.",
};
