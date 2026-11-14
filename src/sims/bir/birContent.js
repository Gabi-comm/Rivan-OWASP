import iconTaxCode from "../../assets/bir/icon-tax-code.png";
import iconCitizensCharter from "../../assets/bir/icon-citizens-charter.png";
import iconZonalValues from "../../assets/bir/icon-zonal-values.png";
import iconIndustrialCode from "../../assets/bir/icon-industrial-code.png";
import iconAntiCorruption from "../../assets/bir/icon-anti-corruption.png";
import iconRevenueIssuances from "../../assets/bir/icon-revenue-issuances.png";
import iconBirForms from "../../assets/bir/icon-bir-forms.png";
import iconAgentBanks from "../../assets/bir/icon-agent-banks.png";
import iconIso from "../../assets/bir/icon-iso.png";
import iconPenalties from "../../assets/bir/icon-penalties.png";
import iconDashboard from "../../assets/bir/icon-dashboard.png";
import cardEnhancedMfr from "../../assets/bir/card-enhanced-mfr.jpg";
import cardCmepa from "../../assets/bir/card-cmepa.jpg";
import cardCreateMore from "../../assets/bir/card-create-more.jpg";
import eserviceOrus from "../../assets/bir/eservice-orus.jpg";
import eserviceEfps from "../../assets/bir/eservice-efps.jpg";
import eserviceEbirforms from "../../assets/bir/eservice-ebirforms.jpg";

/** Copy and artwork for the simulated site, kept apart from the markup. */

export const NAV_ITEMS = [
  { label: "Home" },
  { label: "About Us", menu: true },
  { label: "eServices", lower: "e" },
  { label: "Tax Information & Regulations", menu: true },
  { label: "Announcements", menu: true },
  { label: "Others", menu: true },
  { label: "Careers", menu: true },
  { label: "Contact Us" },
];

/** Two columns, read top to bottom. `icon: null` falls back to an inline SVG. */
export const QUICK_LINKS = [
  [
    { label: "Tax Code", icon: iconTaxCode },
    { label: "BIR Citizen's Charter", icon: iconCitizensCharter },
    { label: "Zonal Values", icon: iconZonalValues },
    { label: "Industrial / Occupational Code", icon: iconIndustrialCode },
    { label: "Anti-Corruption Law", icon: iconAntiCorruption },
    { label: "Taxpayer Bill of Rights", icon: null },
  ],
  [
    { label: "Revenue Issuances", icon: iconRevenueIssuances },
    { label: "BIR Forms", icon: iconBirForms },
    { label: "Authorized Agent Banks", icon: iconAgentBanks },
    { label: "ISO Certification", icon: iconIso },
    { label: "Penalties", icon: iconPenalties },
    { label: "Revenue Collection Performance Dashboard", icon: iconDashboard },
  ],
];

export const LAW_CARDS = [
  {
    image: cardEnhancedMfr,
    alt: "Enhanced MFR - Enhanced Mining Fiscal Regime, per Republic Act No. 12253",
    title: "Enhanced Fiscal Regime for Large-Scale Metallic Mining Act",
    sub: "Per Republic Act No. 12253",
    link: "Enhanced MFR",
  },
  {
    image: cardCmepa,
    alt: "CMEPA - Capital Markets Efficiency Promotion Act, per Republic Act No. 12214",
    title: "Capital Markets Efficiency Promotion Act",
    sub: "Per Republic Act No. 12214",
    link: "CMEPA",
  },
  {
    image: cardCreateMore,
    alt: "CREATE MORE, per Republic Act No. 12066",
    title: "CREATE MORE",
    sub: "Per Republic Act No. 12066",
    link: "CREATE MORE",
  },
];

export const ESERVICES = [
  {
    image: eserviceOrus,
    alt: "ORUS",
    title: "ORUS",
    body: "The Online Registration and Update System (ORUS) facilitates the end-to-end process of taxpayer registration and updating of information.",
  },
  {
    image: eserviceEfps,
    alt: "eFPS",
    title: "eFPS",
    body: "The Electronic Filing and Payment System enables taxpayers to file their tax returns and pay their taxes online via the BIR website.",
  },
  {
    image: eserviceEbirforms,
    alt: "eBIRForms",
    title: "eBIRForms",
    body: "The Electronic Bureau of Internal Revenue Forms (eBIRForms) provides taxpayers with a more convenient way to prepare and file their tax returns ...",
  },
];

/**
 * "What's New" entries. `lead` is the bold run-in label; `links` are the blue
 * trailing links (inert here - the simulation is a single page).
 */
export const WHATS_NEW = {
  Advisories: [
    {
      text: "Advisory on Unavailability/Inaccessibility of the System Registration Module for new enrollees of the Taxpayer Portal, Electronic Tax Clearance System, and 230X System.",
      links: ["more"],
    },
    {
      text: "Advisory on Availability/Accessibility of Various Systems (eFPS, eSales, eAccReg, eTINQuery, eARMS, eAFS, eTSPCert, eCOMPLAINT, eBIRForms, eCAR, OTS, eLAMS and eORB).",
      links: ["more"],
    },
    {
      lead: "Tax Advisory:",
      text: "Due to the declaration of Special (Non-Working) Days in the NCR for the 49th ASEAN Summit and Related Summits, the deadlines for filing tax returns and paying taxes falling within November 16–18, 2026 for taxpayers under affected NCR Revenue District Offices have been extended to November 19, 2026.",
      links: ["more"],
    },
    {
      lead: "Tax Advisory:",
      text: "The Bureau of Internal Revenue extends the deadline for submission of applications for accreditation as Electronic Invoicing Service Providers from October 30, 2026 to December 1, 2026.",
      links: ["more"],
    },
    {
      text: "Advisory on Availability/Accessibility of eBIRForms System.",
      links: ["more"],
    },
    {
      lead: "Public Advisory:",
      text: "The Bureau of Internal Revenue is actively responding to cybersecurity incidents reported on November 6 and 7, 2026. The BIR immediately acted to preserve evidence, stop further exposure, and determine the scope of affected records.",
      links: ["more"],
    },
    {
      lead: "Bank Bulletin No. 2026-11:",
      text: "Acceptance of tax returns and corresponding tax payments covered by the extension due to system maintenance affecting the eBIRForms Offline Package.",
      links: ["more"],
    },
    {
      text: "Advisory on Unavailability/Inaccessibility of Online Registration and Update System (ORUS).",
      links: ["more"],
    },
    {
      text: "Advisory on Availability/Accessibility of the COR QR Code Verifier.",
      links: ["more"],
    },
    {
      lead: "Public Advisory:",
      text: "Please be advised that, as of September 14, 2026, the BIR has not accredited, authorized, certified, recognized, or endorsed any entity as an official BIR e-Invoicing Service Provider (ESP), partner, representative, or solution provider of electronic invoicing and sales reporting system.",
      links: ["more"],
    },
    {
      text: "Revenue Region No. 13-Central Visayas Region shall conduct a Public Auction of Acquired Assets on November 18, 2026, from 2:00 p.m. to 4:00 p.m. at the BIR Multi-Purpose Hall, 6th Floor, New BIR Regional Office Building, Archbishop Reyes Avenue, Cebu City.",
      links: ["Notice", "Guidelines"],
    },
    {
      text: "The Bureau of Internal Revenue shall conduct a Public Auction of Acquired Real Assets on November 26, 2026, 9:00 a.m. at the Revenuers Development & Leisure Center, BIR National Office Compound, Diliman, Quezon City.",
      links: ["Notice", "Guidelines"],
    },
    {
      lead: "Public Advisory:",
      text: "The BIR warns the public against fraudulent tax refund schemes circulating through Viber and other messaging applications.",
      links: ["more"],
    },
    {
      lead: "Tax Advisory:",
      text: "Delay/Non-receipt of system generated email confirmation from eBIRForms.",
      links: ["more"],
    },
    {
      lead: "Email Alert Advisory",
      text: "on Phishing/Spoofing.",
      links: ["more"],
    },
    {
      lead: "Schedule of Briefing for New Business Registrants in Revenue District Offices.",
      text: "",
      links: ["Schedule"],
    },
    {
      text: "Advisory on offers of Taxpayer Identification Number (TIN) services.",
      links: ["Advisory", "Babala"],
    },
  ],
  "New Issuances": [
    {
      lead: "Revenue Regulations:",
      text: "Proposed Revenue Regulations on the Guidelines and Procedures in Administering the Advance Pricing Arrangement Program.",
      links: ["Draft RR"],
    },
    {
      lead: "Revenue Memorandum Circular:",
      text: "Clarifies the electronic submission of Audited Financial Statements and other required attachments through the Electronic Audited Financial Statement (eAFS) system.",
      links: ["more"],
    },
  ],
  News: [
    {
      text: "RD 17B-North Tarlac Revenue Officers filed a RATE case at the Tarlac City Office of the Provincial Prosecutor against a vapor shop owner on October 28, 2026.",
      links: ["more"],
    },
    {
      text: "List of Cannot Be Located (CBL) Taxpayers.",
      links: ["April 29, 2026", "April 28, 2026"],
    },
  ],
  Programs: [
    {
      lead: "Run After Tax Evaders (RATE) Program.",
      text: "Investigation and prosecution of individuals and entities engaged in tax evasion.",
      links: ["more"],
    },
    {
      lead: "Mahusay na Serbisyo, Katumbas ng Buwis Mo.",
      text: "The Bureau's taxpayer service campaign.",
      links: ["more"],
    },
  ],
};

export const FOOTER_LINKS = [
  "Gov.PH",
  "Official Gazette",
  "Department of Finance",
  "Privacy Notice",
  "Contact Us",
  "Accessibility",
  "Site Map",
  "Open Data Philippines",
  "• Data.Gov.PH",
  "• Customs ng Bayan",
  "• Full Disclosure Portal (LGU)",
];
