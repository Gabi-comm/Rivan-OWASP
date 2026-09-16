import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  clearPlantedReviews,
  getPlantedReviews,
  subscribe,
} from "../../sims/mcdo/plantedReviews.js";
import "./IndirectPromptInjectionLayout.css";

const ROLES = [
  { to: "victim", label: "Victim", hint: "Just asks a question" },
  { to: "attacker", label: "Attacker", hint: "Plants the instruction" },
];

/**
 * Role switcher for the two views of the same site.
 *
 * It floats at the left edge rather than sitting in the page, so neither view
 * has a band of lab chrome above it - the replica should fill the screen and
 * look like an ordinary site.
 */
export default function IndirectPromptInjectionLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const rootRef = useRef(null);
  const planted = useSyncExternalStore(subscribe, getPlantedReviews, getPlantedReviews);

  const current = ROLES.find((role) => pathname.endsWith(role.to)) ?? ROLES[0];

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="ipi-shell">
      <div className="role-switch" ref={rootRef}>
        <button
          className={`role-switch__trigger${open ? " is-open" : ""}`}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <span className="role-switch__eyebrow">Viewing as</span>
          <span className="role-switch__current">{current.label}</span>
          <span className="role-switch__caret" aria-hidden="true">
            {open ? "‹" : "›"}
          </span>
        </button>

        {open && (
          <div className="role-switch__menu" role="menu">
            {ROLES.map((role) => (
              <NavLink
                key={role.to}
                to={role.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `role-switch__item${isActive ? " is-active" : ""}`
                }
              >
                <span className="role-switch__item-label">{role.label}</span>
                <span className="role-switch__item-hint">{role.hint}</span>
              </NavLink>
            ))}

            <button
              className="role-switch__reset"
              type="button"
              onClick={clearPlantedReviews}
              disabled={planted.length === 0}
            >
              {planted.length
                ? `Clear ${planted.length} planted review${planted.length > 1 ? "s" : ""}`
                : "Nothing planted"}
            </button>
          </div>
        )}
      </div>

      <Outlet />
    </div>
  );
}
