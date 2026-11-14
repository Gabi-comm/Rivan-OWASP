import { useState } from "react";
import heroMancom from "../../assets/bir/hero-mancom.jpg";
import taxCalendar from "../../assets/bir/tax-calendar.jpg";
import slidePublicAuction from "../../assets/bir/slide-public-auction.jpg";
import slideRateProgram from "../../assets/bir/slide-rate-program.jpg";
import appointment from "../../assets/bir/appointment.png";
import taxCalculator from "../../assets/bir/tax-calculator.png";
import npcSeal from "../../assets/bir/npc-seal.png";
import campaignLogo from "../../assets/bir/campaign-logo.png";
import { ESERVICES, LAW_CARDS, QUICK_LINKS, WHATS_NEW } from "./birContent.js";

/* Every button and link in here is inert: the simulation is a single page. */

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path d="M5.5 10h8m-3.2-3.3 3.3 3.3-3.3 3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
    </svg>
  );
}

function ScalesIcon() {
  return (
    <svg className="bir-quick__icon" viewBox="0 0 44 44" aria-hidden="true">
      <g fill="none" stroke="#1f2a44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 6v30M12 38h20M8 12h28" />
        <path d="m8 12-6 13a6 6 0 0 0 12 0L8 12Zm28 0-6 13a6 6 0 0 0 12 0l-6-13Z" />
      </g>
    </svg>
  );
}

/**
 * A banner whose headline is baked into the artwork. The same image, blurred,
 * fills the gutters either side so the strip runs edge to edge.
 */
function Banner({ image, alt, dots = 0, caption, className = "" }) {
  return (
    <section
      className={`bir-banner ${className}`}
      style={{ "--bir-banner-image": `url("${image}")` }}
    >
      <img className="bir-banner__image" src={image} alt={alt} />

      {dots > 0 && (
        <>
          <span className="bir-banner__pause" aria-hidden="true" />
          <div className="bir-banner__pager" aria-hidden="true">
            {Array.from({ length: dots }, (_, i) => (
              <span key={i} className={i === 0 ? "is-active" : ""} />
            ))}
          </div>
        </>
      )}

      {caption && (
        <button className="bir-banner__caption" type="button">
          {caption}
        </button>
      )}
    </section>
  );
}

export function BirHero() {
  return (
    <Banner
      className="bir-banner--hero"
      image={heroMancom}
      alt="Streamlined Tax Services for a Hassle-Free Experience. With service excellence as our guiding principle, we strive to achieve our vision of becoming an institution of integrity and excellence. Explore our website to learn more about our services, programs and initiatives."
    />
  );
}

export function BirTaxReminder() {
  const today = new Date();
  const date = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section className="bir-reminder">
      <div className="bir-reminder__inner bir-shell">
        <img
          className="bir-reminder__image"
          src={taxCalendar}
          alt="2026 Tax Calendar - your guide to tax compliance"
        />
        <div className="bir-reminder__copy">
          <h2 className="bir-h2">Tax Reminder</h2>
          <p>
            Stay updated with essential tax deadlines and obligations. Easily
            keep track of important filing and payment dates to ensure seamless
            compliance with the BIR regulations.
          </p>
          <div className="bir-rule" />
          <p className="bir-reminder__today">
            Today: {date} {weekday}
          </p>
          <p className="bir-reminder__item">
            e-FILING
            <br />
            BIR Forms 1601-C (Monthly Remittance Return of Incom...
          </p>
          <button className="bir-btn" type="button">
            View more
          </button>
        </div>
      </div>
    </section>
  );
}

export function BirAuctionSlider() {
  return (
    <Banner
      image={slidePublicAuction}
      dots={23}
      caption="Notice & Guidelines"
      alt="Revenue Region No. 13 - Central Visayas Region will hold a Public Auction of Acquired Assets on 18 November 2026, from 2:00 p.m. to 4:00 p.m., at the BIR Multi-Purpose Hall, 6th Floor, New BIR Regional Office Building, Archbishop Reyes Avenue, Cebu City."
    />
  );
}

export function BirQuickLinks() {
  return (
    <section className="bir-section bir-shell">
      <h2 className="bir-h2 bir-h2--center">Quick Links</h2>
      <div className="bir-rule bir-rule--center" />

      <div className="bir-quick">
        {QUICK_LINKS.map((column, index) => (
          <ul key={index}>
            {column.map((link) => (
              <li key={link.label}>
                <button type="button">
                  {link.icon ? (
                    <img className="bir-quick__icon" src={link.icon} alt="" />
                  ) : (
                    <ScalesIcon />
                  )}
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

export function BirLawCards() {
  return (
    <section className="bir-shell">
      <div className="bir-cards">
        {LAW_CARDS.map((card) => (
          <article className="bir-card" key={card.title}>
            <img className="bir-card__image" src={card.image} alt={card.alt} />
            <div className="bir-card__body">
              <h3>{card.title}</h3>
              <p>{card.sub}</p>
              <button className="bir-more" type="button">
                {card.link} <ArrowIcon />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BirWhatsNew() {
  const tabs = Object.keys(WHATS_NEW);
  const [active, setActive] = useState(tabs[0]);

  return (
    <section className="bir-section bir-shell">
      <h2 className="bir-h2 bir-h2--center">What&apos;s New</h2>
      <div className="bir-rule bir-rule--center" />

      <div className="bir-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={tab === active}
            className={`bir-tabs__tab${tab === active ? " is-active" : ""}`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul className="bir-news" role="tabpanel">
        {WHATS_NEW[active].map((entry, index) => (
          <li key={index}>
            {entry.lead && <strong>{entry.lead} </strong>}
            {entry.text}{" "}
            {entry.links.map((link, i) => (
              <span key={link}>
                {i > 0 && <span className="bir-news__sep"> | </span>}
                <button className="bir-link" type="button">
                  {link}
                </button>
              </span>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BirEServices() {
  return (
    <section className="bir-section bir-shell">
      <h2 className="bir-h2 bir-h2--center bir-h2--lg">eServices We Provide</h2>
      <div className="bir-rule bir-rule--center" />
      <p className="bir-lede">
        Our eServices are aimed at promoting efficiency, transparency, and
        compliance, making tax compliance easier and more accessible for
        everyone.
      </p>

      <div className="bir-cards">
        {ESERVICES.map((service) => (
          <article className="bir-card bir-card--service" key={service.title}>
            <img className="bir-card__image" src={service.image} alt={service.alt} />
            <div className="bir-card__body">
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <button className="bir-more" type="button">
                More <ArrowIcon />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function BirAppointment() {
  return (
    <section className="bir-appointment">
      <div className="bir-appointment__inner bir-shell">
        <div>
          <h2 className="bir-h2">Schedule your APPOINTMENT with us!</h2>
          <div className="bir-rule" />
          <p>Reserve your time and date of visit. Skip long queues and save time!</p>
          <button className="bir-btn" type="button">
            Book via eAPPOINTMENT Now!
          </button>
        </div>
        <img src={appointment} alt="Appointment Confirmed!" />
      </div>
    </section>
  );
}

export function BirInAction() {
  return (
    <>
      <div className="bir-section bir-section--tight bir-shell">
        <h2 className="bir-h2 bir-h2--center">BIR in Action</h2>
        <div className="bir-rule bir-rule--center" />
      </div>
      <Banner
        image={slideRateProgram}
        dots={10}
        alt="Run After Tax Evaders (RATE) Program. On October 28, 2026, RD 17B-North Tarlac Revenue Officers filed a RATE case at the Tarlac City Office of the Provincial Prosecutor against a vapor shop owner."
      />
    </>
  );
}

export function BirCalculator() {
  return (
    <section className="bir-calculator">
      <div className="bir-calculator__inner bir-shell">
        <img src={taxCalculator} alt="Withholding Tax Calculator on a phone and laptop" />
        <div>
          <h2 className="bir-h2">Withholding Tax Calculator</h2>
          <div className="bir-rule" />
          <p>
            Estimate your withholding tax through our user-friendly Withholding
            Tax Calculator. Input your income details to calculate your
            estimated withholding tax for the period.
          </p>
          <button className="bir-btn" type="button">
            View Tax Calculator
          </button>
        </div>
      </div>
    </section>
  );
}

export function BirNpcSeal() {
  return (
    <section className="bir-npc">
      <div className="bir-npc__inner bir-shell">
        <div>
          <h2 className="bir-h2">NPC Seal of Registration</h2>
          <div className="bir-rule" />
          <p>
            This is to certify that Bureau of Internal Revenue with business
            address at BIR Rd. Diliman Quezon City, QUEZON CITY, METRO MANILA
            has duly complied with the registration requirements of the Data
            Privacy Act of 2012, its implementing rules and regulations, and all
            related issuances.
          </p>
          <button className="bir-btn" type="button">
            Learn More
          </button>
        </div>
        <img
          src={npcSeal}
          alt="National Privacy Commission - DPO/DPS Registered. Datos ng Pilipino, protektado ko!"
        />
      </div>
    </section>
  );
}

export function BirVisitors() {
  return (
    <section className="bir-visitors bir-shell">
      <img src={campaignLogo} alt="Mahusay na Serbisyo, Katumbas ng Buwis Mo" />
      <div>
        <h2 className="bir-h2">Visitors Count</h2>
        <p>Starting July 17, 2024</p>
        <div className="bir-rule" />
        <p className="bir-visitors__count">168,853,084</p>
      </div>
    </section>
  );
}
