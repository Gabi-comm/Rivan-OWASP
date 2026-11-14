import coatOfArms from "../../assets/bir/coat-of-arms.png";
import birSeal from "../../assets/bir/bir-seal.png";
import bagongPilipinas from "../../assets/bir/bagong-pilipinas.png";
import dictLogo from "../../assets/bir/dict-logo.png";
import { FOOTER_LINKS } from "./birContent.js";

const SOCIALS = [
  {
    label: "Facebook",
    path: "M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 12 2Z",
  },
  {
    label: "X",
    path: "M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.2 4.7H5.4l11.3 14.5Z",
  },
  {
    label: "YouTube",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3-5.2 3Z",
  },
];

/** Dark footer: state seal, copyright, government links, socials, credits. */
export default function BirFooter() {
  return (
    <footer className="bir-footer">
      <div className="bir-footer__inner bir-shell">
        <img className="bir-footer__arms" src={coatOfArms} alt="Republika ng Pilipinas" />

        <div className="bir-footer__brand">
          <div className="bir-footer__logos">
            <img src={birSeal} alt="Bureau of Internal Revenue - Bringing In Revenues for Nation-building" />
            <img src={bagongPilipinas} alt="Bagong Pilipinas" />
          </div>
          <p>
            Copyright © Bureau of Internal Revenue.
            <br />
            All Rights Reserved
          </p>
        </div>

        <ul className="bir-footer__links">
          {FOOTER_LINKS.map((label) => (
            <li key={label}>
              <button type="button">{label}</button>
            </li>
          ))}
        </ul>

        <div className="bir-footer__follow">
          <p className="bir-footer__heading">Follow Us</p>
          <div className="bir-footer__socials">
            {SOCIALS.map((social) => (
              <button key={social.label} type="button" aria-label={social.label}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d={social.path} fill="currentColor" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="bir-footer__credits">
          <p className="bir-footer__heading">Developed By:</p>
          <div className="bir-footer__logos">
            <img src={birSeal} alt="" />
            <img className="bir-footer__dict" src={dictLogo} alt="Department of Information and Communications Technology" />
          </div>
        </div>
      </div>
    </footer>
  );
}
