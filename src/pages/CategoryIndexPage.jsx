import { Link } from "react-router-dom";
import { CATEGORIES } from "../components/categories.js";
import "./CategoryIndexPage.css";

/**
 * Lists either the top-level categories or one category's sub-topics. Both
 * views read from the same CATEGORIES tree the header navigates by, so the
 * menu and these pages can't drift apart.
 */
export default function CategoryIndexPage({ categoryId }) {
  const category = categoryId
    ? CATEGORIES.find((entry) => entry.id === categoryId)
    : null;

  const items = category?.children ?? CATEGORIES;
  const heading = category ? category.label : "Category";
  const blurb = category
    ? category.blurb
    : "Pick a track. Each one builds up from how the attack works to a simulation you can run yourself.";

  return (
    <div className="site-layout__shell category-index">
      <header className="category-index__intro">
        <p className="category-index__eyebrow">
          {category ? "LLM01: Prompt Injection" : "Rivan Simulation"}
        </p>
        <h1 className="category-index__heading">{heading}</h1>
        <div className="category-index__accent" />
        <p className="category-index__blurb">{blurb}</p>
      </header>

      <ul className="category-index__grid">
        {items.map((item) => {
          // A parent counts as ready when anything inside it is.
          const ready = item.ready || item.children?.some((child) => child.ready);

          return (
          <li key={item.id}>
            <Link className="topic-card" to={item.path}>
              <span className={`topic-card__status${ready ? " is-ready" : ""}`}>
                {ready
                  ? item.children
                    ? "Simulation available"
                    : "Simulation ready"
                  : "In development"}
              </span>
              <h2 className="topic-card__title">{item.label}</h2>
              <p className="topic-card__blurb">{item.blurb}</p>
              {item.children && (
                <p className="topic-card__count">
                  {item.children.length} topics
                </p>
              )}
            </Link>
          </li>
          );
        })}
      </ul>

      {category && (
        <Link className="category-index__back" to="/category">
          ← All categories
        </Link>
      )}
    </div>
  );
}
