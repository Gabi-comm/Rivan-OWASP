import { Link } from "react-router-dom";
import "./ComingSoonPage.css";

/** Shared stub for topics that are routed but not built yet. */
export default function ComingSoonPage({
  title,
  blurb,
  eyebrow = "In development",
  backTo = "/category",
  backLabel = "All categories",
}) {
  return (
    <div className="site-layout__shell coming-soon">
      <p className="coming-soon__eyebrow">{eyebrow}</p>
      <h1 className="coming-soon__heading">{title}</h1>
      <div className="coming-soon__accent" />
      <p className="coming-soon__blurb">{blurb}</p>
      <Link className="coming-soon__back" to={backTo}>
        ← {backLabel}
      </Link>
    </div>
  );
}
