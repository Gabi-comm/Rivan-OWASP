import { Outlet } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import "./SiteLayout.css";

/**
 * Shared chrome for everything except the splash screen.
 *
 * The header sits inside the page gutter; <Outlet/> is deliberately left
 * full-bleed so a page can either wrap its content in `.site-layout__shell`
 * or run edge to edge, as the simulation pages do.
 */
export default function SiteLayout() {
  return (
    <div className="site-layout">
      <div className="site-layout__shell">
        <SiteHeader />
      </div>

      <main className="site-layout__main">
        <Outlet />
      </main>
    </div>
  );
}
