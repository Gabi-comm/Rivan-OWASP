import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoRivan from "../assets/logo-rivan.png";
import "./TransitionPage.css";

/** How long the splash holds before handing off to the Home page. */
const HOLD_MS = 2600;

/**
 * Figma: "Transition Page" (node 2:2).
 * A static frame in the design — here it holds briefly, then transitions
 * to the Home page. Click or press any key to skip.
 */
export default function TransitionPage() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const goHome = useCallback(() => setLeaving(true), []);

  useEffect(() => {
    const timer = window.setTimeout(goHome, HOLD_MS);
    window.addEventListener("keydown", goHome);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", goHome);
    };
  }, [goHome]);

  return (
    <div
      className={`transition-page${leaving ? " is-leaving" : ""}`}
      onClick={goHome}
      onTransitionEnd={(event) => {
        if (leaving && event.target === event.currentTarget) navigate("/home");
      }}
      data-node-id="2:2"
    >
      <div className="transition-page__content" data-node-id="3:3">
        <div className="transition-page__logo" data-node-id="3:4">
          <img src={logoRivan} alt="Rivan Security Inc. Academy" />
        </div>

        <div className="transition-page__text" data-node-id="3:5">
          <h1 className="transition-page__heading" data-node-id="3:6">
            Welcome to Rivan Simulation
          </h1>
          <div className="transition-page__divider" data-node-id="3:7" />
          <p className="transition-page__tagline" data-node-id="3:8">
            Rivan Security Inc · EST. 2000
          </p>
        </div>
      </div>

      <p className="transition-page__skip">Click anywhere to continue</p>
    </div>
  );
}
