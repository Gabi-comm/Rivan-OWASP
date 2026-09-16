/**
 * Minimal client for a local Ollama server.
 *
 * Requests go through the Vite dev proxy at /ollama (see vite.config.js) rather
 * than straight to localhost:11434, so the app keeps working whichever port
 * Vite lands on and whether it's opened via localhost or a LAN address.
 */

const ENDPOINT = "/ollama/api/chat";

export const DEFAULT_MODEL = "llama3.2:latest";

/**
 * Models offered in the lab's model picker.
 *
 * gemma3:270m was tried and dropped: against the real page scrape the injection
 * never landed (it answers with a stray fragment), and it gave the secret up
 * with no attack at all. It could not demonstrate either half of the lesson.
 *
 * The picker only renders when there is more than one entry here.
 */
export const MODELS = [{ id: "llama3.2:latest", label: "llama3.2 (3B)" }];

export class OllamaError extends Error {
  constructor(message, { hint } = {}) {
    super(message);
    this.name = "OllamaError";
    this.hint = hint;
  }
}

export async function chat({ model, messages, signal }) {
  let response;

  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        // Greedy decoding. A lab demo that only works half the time teaches
        // the wrong lesson; at temperature 0 both models leak every run.
        options: { temperature: 0 },
      }),
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new OllamaError("Can't reach the local model server.", {
      hint: "Ollama doesn't look like it's running. Start it, then try again.",
    });
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");

    if (response.status === 404) {
      throw new OllamaError(`The model "${model}" isn't available.`, {
        hint: `Pull it first: ollama pull ${model}`,
      });
    }

    throw new OllamaError(
      `The model server returned ${response.status}.`,
      { hint: body.slice(0, 200) || undefined }
    );
  }

  const data = await response.json();
  const content = data?.message?.content?.trim();

  if (!content) {
    throw new OllamaError("The model returned an empty reply.", {
      hint: "Small models sometimes do this. Try rephrasing, or switch models.",
    });
  }

  return content;
}
