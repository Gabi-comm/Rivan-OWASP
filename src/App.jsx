import { Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout.jsx";
import TransitionPage from "./pages/TransitionPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CategoryIndexPage from "./pages/CategoryIndexPage.jsx";
import ComingSoonPage from "./pages/ComingSoonPage.jsx";
import IndirectPromptInjectionLayout from "./pages/ipi/IndirectPromptInjectionLayout.jsx";
import VictimPage from "./pages/ipi/VictimPage.jsx";
import AttackerPage from "./pages/ipi/AttackerPage.jsx";

const PROMPT_HACKING = "/category/prompt-hacking";

export default function App() {
  return (
    <Routes>
      {/* Figma frame "Transition Page" (2:2) — standalone, no site chrome. */}
      <Route path="/" element={<TransitionPage />} />
      {/* Figma frame "Home Page" (6:27) — renders its own SiteHeader. */}
      <Route path="/home" element={<HomePage />} />

      <Route element={<SiteLayout />}>
        <Route path="/about" element={<AboutPage />} />

        <Route path="/category" element={<CategoryIndexPage />} />
        <Route
          path={PROMPT_HACKING}
          element={<CategoryIndexPage categoryId="prompt-hacking" />}
        />
        <Route
          path={`${PROMPT_HACKING}/indirect-prompt-injection`}
          element={<IndirectPromptInjectionLayout />}
        >
          <Route index element={<Navigate to="victim" replace />} />
          <Route path="victim" element={<VictimPage />} />
          <Route path="attacker" element={<AttackerPage />} />
        </Route>
        <Route
          path={`${PROMPT_HACKING}/direct-prompt-injection`}
          element={
            <ComingSoonPage
              title="Direct Prompt Injection"
              blurb="Attacking the model straight through its own input box — jailbreaks, instruction overrides, and role-play framings typed by the user. The simulation for this track is not built yet."
              backTo={PROMPT_HACKING}
              backLabel="Prompt Hacking"
            />
          }
        />
        <Route
          path={`${PROMPT_HACKING}/memory-poisoning`}
          element={
            <ComingSoonPage
              title="Memory Poisoning"
              blurb="Planting something in an assistant's long-term memory now that it acts on in a later, otherwise clean session. The simulation for this track is not built yet."
              backTo={PROMPT_HACKING}
              backLabel="Prompt Hacking"
            />
          }
        />

        <Route
          path="/category/guardrailing"
          element={
            <ComingSoonPage
              title="Guardrailing"
              blurb="The controls that sit between a model and the damage it can do: input and output filtering, privilege separation, and treating retrieved content as data rather than instructions."
            />
          }
        />
        <Route
          path="/category/machine-learning"
          element={
            <ComingSoonPage
              title="Machine Learning"
              blurb="How these systems learn, and where that process leaves them exposed — training data, fine-tuning, and the assumptions that come along for the ride."
            />
          }
        />

        <Route
          path="*"
          element={
            <ComingSoonPage
              eyebrow="404"
              title="Page not found"
              blurb="That route doesn't exist. It may have been renamed, or you may have followed a stale link."
              backTo="/home"
              backLabel="Back to Home"
            />
          }
        />
      </Route>
    </Routes>
  );
}
