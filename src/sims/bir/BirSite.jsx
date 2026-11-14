import BirHeader from "./BirHeader.jsx";
import {
  BirAppointment,
  BirAuctionSlider,
  BirCalculator,
  BirEServices,
  BirHero,
  BirInAction,
  BirLawCards,
  BirNpcSeal,
  BirQuickLinks,
  BirTaxReminder,
  BirVisitors,
  BirWhatsNew,
} from "./BirSections.jsx";
import BirFooter from "./BirFooter.jsx";
import "./bir.css";

/**
 * The simulated tax-agency site for the Direct Prompt Injection lab.
 *
 * Unlike the fast-food sim, nothing here is an attack surface: there is no
 * form to post to and the assistant does not scrape the page. The site is the
 * setting; the attack happens entirely inside the chat box.
 */
export default function BirSite() {
  return (
    <div className="bir-sim">
      <BirHeader />
      <BirHero />
      <BirTaxReminder />
      <BirAuctionSlider />
      <BirQuickLinks />
      <BirLawCards />
      <BirWhatsNew />
      <BirEServices />
      <BirAppointment />
      <BirInAction />
      <BirCalculator />
      <BirNpcSeal />
      <BirVisitors />
      <BirFooter />
    </div>
  );
}
