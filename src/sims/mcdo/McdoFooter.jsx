import footerLogo from "../../assets/mcdo/footer-mcdelivery-logo.png";
import badgeGooglePlay from "../../assets/mcdo/badge-google-play.png";
import badgeAppStore from "../../assets/mcdo/badge-app-store.png";
import socialFacebook from "../../assets/mcdo/social-facebook.png";
import socialInstagram from "../../assets/mcdo/social-instagram.png";
import socialTwitter from "../../assets/mcdo/social-twitter.png";

const LINK_COLUMNS = [
  ["Privacy Policy", "Our Food", "Terms and Conditions", "Opportunities"],
  ["About Us", "Careers", "Menu", "Family Activities"],
];

const SOCIALS = [
  { id: "facebook", image: socialFacebook, label: "Facebook" },
  { id: "instagram", image: socialInstagram, label: "Instagram" },
  { id: "twitter", image: socialTwitter, label: "Twitter" },
];

/** Reference: assets/reference/mcdo-footer.jpg. */
export default function McdoFooter({ onBackToTop }) {
  return (
    <footer className="mcdo-footer">
      <div className="mcdo-footer__inner">
        <img
          className="mcdo-footer__logo"
          src={footerLogo}
          alt="McDelivery"
        />

        <div className="mcdo-footer__badges">
          <img src={badgeGooglePlay} alt="Get it on Google Play" />
          <img src={badgeAppStore} alt="Download on the App Store" />
        </div>

        {LINK_COLUMNS.map((column, index) => (
          <ul className="mcdo-footer__links" key={index}>
            {column.map((label) => (
              <li key={label}>
                <button className="mcdo-footer__link" type="button">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        ))}

        <div className="mcdo-footer__social">
          <p className="mcdo-footer__social-title">Follow us on</p>
          <div className="mcdo-footer__social-icons">
            {SOCIALS.map((social) => (
              <button
                key={social.id}
                className="mcdo-footer__social-button"
                type="button"
                aria-label={social.label}
              >
                <img src={social.image} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        className="mcdo-footer__top"
        type="button"
        aria-label="Back to top"
        onClick={onBackToTop}
      >
        <span aria-hidden="true">^</span>
      </button>
    </footer>
  );
}
