import { useEffect, useRef, useState } from "react";
import { chat, DEFAULT_MODEL, MODELS, OllamaError } from "./ollama.js";
import { buildSystemPrompt } from "./systemPrompt.js";
import { detectLeak, detectPlantedEffects } from "./leakDetector.js";
import { harvestPageContext } from "../sims/mcdo/pageContext.js";
import "./ChatWidget.css";

/**
 * Everything that differs between the sims the widget sits on: copy, colours,
 * the system prompt, and which secrets count as a leak. The default is the
 * fast-food site from the Indirect Prompt Injection lab; other labs pass their
 * own (see sims/bir/birPersona.js).
 */
const MCDO_PERSONA = {
  theme: "",
  name: "McDelivery Assistant",
  subtitle: "Simulated support bot",
  greeting:
    "Hi! I'm the McDelivery PH assistant. Ask me about our promos, delivery, menu or careers.",
  suggestions: [
    "What promos do you have?",
    "Tell me about the NXTGEN store",
    "How do I apply for a job?",
  ],
  placeholder: "Ask about promos, delivery, careers…",
  buildSystemPrompt,
  secrets: undefined, // detectLeak's default
  leakCause: "the hidden text on this page talked it into it.",
};

/** Canned opener. `local` keeps it out of what gets sent to the model — it is
    UI copy the model never produced, and small models answer it instead of the
    user's actual question. */
const greetingFor = (persona) => ({
  role: "assistant",
  local: true,
  content: persona.greeting,
});

/**
 * The simulated site's support bot.
 *
 * Before every request it re-scrapes `scrapeRef` and rebuilds the system
 * prompt, which is exactly how a real page-aware assistant behaves — and
 * exactly how the planted instructions reach the model.
 */
export default function ChatWidget({
  scrapeRef,
  reveal,
  onToggleReveal,
  persona = MCDO_PERSONA,
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [greetingFor(persona)]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [lastPrompt, setLastPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  // Collapsed by default: during a demo the class is looking at this panel too.
  const [labOpen, setLabOpen] = useState(false);

  const selectedModel = MODELS.find((option) => option.id === model);

  const abortRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, busy, error]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const send = async (text) => {
    const question = text.trim();
    if (!question || busy) return;

    const history = [...messages, { role: "user", content: question }];
    setMessages(history);
    setInput("");
    setError(null);
    setBusy(true);

    const pageContext = harvestPageContext(scrapeRef?.current);
    const systemPrompt = persona.buildSystemPrompt(pageContext);
    setLastPrompt(systemPrompt);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const reply = await chat({
        model,
        signal: controller.signal,
        messages: [
          { role: "system", content: systemPrompt },
          ...history
            .filter((message) => !message.local)
            .map(({ role, content }) => ({ role, content })),
        ],
      });

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: reply,
          leaks: detectLeak(reply, persona.secrets),
          effects: detectPlantedEffects(reply),
        },
      ]);
    } catch (caught) {
      if (caught.name === "AbortError") return;
      setError(
        caught instanceof OllamaError
          ? { message: caught.message, hint: caught.hint }
          : { message: "Something went wrong talking to the model." }
      );
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  if (!open) {
    return (
      <button
        className={`chat-launcher ${persona.theme}`}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open the ${persona.name}`}
      >
        <span aria-hidden="true">💬</span>
      </button>
    );
  }

  return (
    <section className={`chat-panel ${persona.theme}`} aria-label={persona.name}>
      <header className="chat-panel__header">
        <div>
          <p className="chat-panel__title">{persona.name}</p>
          <p className="chat-panel__subtitle">{persona.subtitle}</p>
        </div>
        <button
          className="chat-panel__close"
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close chat"
        >
          ×
        </button>
      </header>

      <div className="chat-panel__log" ref={logRef}>
        {messages.map((message, index) => (
          <div key={index} className={`chat-msg chat-msg--${message.role}`}>
            {message.effects?.length > 0 && (
              <p className="chat-leak" role="status">
                <strong>⚠ Planted payload executed</strong> — this reply is
                following an instruction from a review someone posted to the
                site, not from the developer who built this bot.
              </p>
            )}
            {message.leaks?.length > 0 && (
              <p className="chat-leak" role="status">
                <strong>⚠ Injection successful</strong> — this reply leaked the{" "}
                {message.leaks.map((leak) => leak.label).join(" and the ")}. The
                model was told never to share {message.leaks.length > 1 ? "them" : "it"};{" "}
                {persona.leakCause}
              </p>
            )}
            <div className="chat-msg__bubble">{message.content}</div>
          </div>
        ))}

        {busy && (
          <div className="chat-msg chat-msg--assistant">
            <div className="chat-msg__bubble chat-msg__bubble--typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        {error && (
          <p className="chat-error" role="alert">
            <strong>{error.message}</strong>
            {error.hint && <span className="chat-error__hint">{error.hint}</span>}
          </p>
        )}
      </div>

      {messages.length === 1 && !busy && (
        <div className="chat-panel__suggestions">
          {persona.suggestions.map((suggestion) => (
            <button
              key={suggestion}
              className="chat-chip"
              type="button"
              onClick={() => send(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form
        className="chat-panel__form"
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
      >
        <input
          className="chat-panel__input"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={persona.placeholder}
          disabled={busy}
        />
        <button className="chat-panel__send" type="submit" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>

      <div className="chat-lab">
        <button
          className="chat-lab__summary"
          type="button"
          onClick={() => setLabOpen((value) => !value)}
          aria-expanded={labOpen}
        >
          <span>Lab controls</span>
          <span className="chat-lab__caret" aria-hidden="true">
            {labOpen ? "–" : "+"}
          </span>
        </button>

        {labOpen && (
          <div className="chat-lab__body">
            {MODELS.length > 1 ? (
              <label className="chat-lab__row">
                <span>Model</span>
                <select
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                  disabled={busy}
                >
                  {MODELS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <p className="chat-lab__row chat-lab__row--static">
                <span>Model</span>
                <span>{selectedModel?.label ?? model}</span>
              </p>
            )}

            {/* Only labs with something concealed on the page offer this. */}
            {onToggleReveal && (
              <label className="chat-lab__row chat-lab__row--check">
                <input
                  type="checkbox"
                  checked={reveal}
                  onChange={(event) => onToggleReveal(event.target.checked)}
                />
                <span>Reveal hidden payload on the page</span>
              </label>
            )}

            <button
              className="chat-lab__toggle"
              type="button"
              onClick={() => {
                abortRef.current?.abort();
                setBusy(false);
                setError(null);
                setMessages([greetingFor(persona)]);
              }}
              disabled={messages.length === 1}
            >
              Start a new conversation
            </button>

            <button
              className="chat-lab__toggle"
              type="button"
              onClick={() => setShowPrompt((value) => !value)}
              disabled={!lastPrompt}
              aria-expanded={showPrompt}
            >
              {showPrompt ? "Hide" : "Show"} what the model received
              {!lastPrompt && " (send a message first)"}
            </button>

            {showPrompt && lastPrompt && (
              <pre className="chat-lab__prompt">{lastPrompt}</pre>
            )}
          </div>
        )}
      </div>

    </section>
  );
}
