import birWordmark from "../../assets/bir/bir-wordmark.png";
import transparencySeal from "../../assets/bir/transparency-seal.png";
import foiSeal from "../../assets/bir/foi-seal.png";
import { NAV_ITEMS } from "./birContent.js";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        d="M6.6 3.5h2.7l1.4 3.9-1.9 1.5a11.5 11.5 0 0 0 5.3 5.3l1.5-1.9 3.9 1.4v2.7a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7.5 8 5.5 8-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="m15 15 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Top bar (contact, logo, search, seals) and the main navigation strip. */
export default function BirHeader() {
  return (
    <header className="bir-header">
      <div className="bir-header__top bir-shell">
        <img
          className="bir-header__logo"
          src={birWordmark}
          alt="Republic of the Philippines - Bureau of Internal Revenue"
        />

        <div className="bir-header__right">
          <p className="bir-header__contact">
            <span>
              <PhoneIcon /> (02)-8538-3200
            </span>
            <span>
              <MailIcon /> contact_us@bir.gov.ph
            </span>
          </p>

          <div className="bir-header__tools">
            {/* Inert: this simulation is a single page. */}
            <label className="bir-search">
              <input type="search" placeholder="Search" aria-label="Search" />
              <SearchIcon />
            </label>
            <img className="bir-header__seal" src={transparencySeal} alt="Philippine Transparency Seal" />
            <img className="bir-header__seal" src={foiSeal} alt="Freedom of Information Philippines" />
          </div>
        </div>
      </div>

      <nav className="bir-nav" aria-label="Simulated site navigation">
        <ul className="bir-nav__list bir-shell">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <button className="bir-nav__link" type="button">
                <span>
                  {item.lower && <span className="bir-nav__lower">{item.lower}</span>}
                  {item.label.slice(item.lower?.length ?? 0)}
                </span>
                {item.menu && (
                  <svg viewBox="0 0 12 8" width="10" height="7" aria-hidden="true">
                    <path d="m1 1.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
