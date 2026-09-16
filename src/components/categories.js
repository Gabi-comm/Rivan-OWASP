/** Figma "Category menu" (6:37) — items 6:39 / 6:41 / 6:43.
    Prompt Hacking gained a second level once the attack simulations landed. */
export const CATEGORIES = [
  {
    id: "prompt-hacking",
    label: "LLM01: Prompt Injection",
    path: "/category/prompt-hacking",
    blurb: "Get a model to ignore the instructions it was given.",
    children: [
      {
        id: "indirect-prompt-injection",
        label: "Indirect Prompt Injection",
        path: "/category/prompt-hacking/indirect-prompt-injection",
        blurb:
          "Instructions hidden in content the model reads, not in what the user types.",
        ready: true,
      },
      {
        id: "direct-prompt-injection",
        label: "Direct Prompt Injection",
        path: "/category/prompt-hacking/direct-prompt-injection",
        blurb: "Attacking the model straight through its own input box.",
      },
      {
        id: "memory-poisoning",
        label: "Memory Poisoning",
        path: "/category/prompt-hacking/memory-poisoning",
        blurb: "Planting something now that the model acts on in a later session.",
      },
    ],
  },
  {
    id: "guardrailing",
    label: "Guardrailing",
    path: "/category/guardrailing",
    blurb: "The controls that sit between a model and the damage it can do.",
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    path: "/category/machine-learning",
    blurb: "How these systems learn, and where that leaves them exposed.",
  },
];
