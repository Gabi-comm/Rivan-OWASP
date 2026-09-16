import mcdoLogo from "../../assets/mcdo/mcdo-logo.png";

const NAV_LINKS = [
  "Home",
  "About Us",
  "Family Activities",
  "McDelivery",
  "Careers",
  "Opportunities",
];

/** Reference: assets/reference/page-1.jpg (top bar). */
export default function McdoNav() {
  return (
    <nav className="mcdo-nav" aria-label="Simulated site navigation">
      <div className="mcdo-nav__inner">
        <img className="mcdo-nav__logo" src={mcdoLogo} alt="Golden arches" />

        <ul className="mcdo-nav__links">
          {NAV_LINKS.map((label) => (
            <li key={label}>
              {/* Inert: this simulation is a single page. */}
              <button className="mcdo-nav__link" type="button">
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button className="mcdo-nav__burger" type="button" aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
