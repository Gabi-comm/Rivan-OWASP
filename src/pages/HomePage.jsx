import SiteHeader from "../components/SiteHeader.jsx";
import PromoSlideshow from "../components/PromoSlideshow.jsx";
import "./HomePage.css";

/** Figma: "Home Page" (node 6:27). */
export default function HomePage() {
  return (
    <div className="home-page" data-node-id="6:27">
      <div className="home-page__shell">
        <SiteHeader activeTab="Home" />

        <main className="home-page__main">
          <section className="page-intro" data-node-id="6:44">
            <p className="page-intro__eyebrow" data-node-id="6:45">
              Rivan Simulation
            </p>
            <h1 className="page-intro__heading" data-node-id="6:46">
              Security learning, built for real-world challenges.
            </h1>
            <div className="page-intro__accent" data-node-id="6:47" />
            <p className="page-intro__description" data-node-id="6:48">
              Explore practical topics in prompt security, machine learning,
              and guardrailing.
            </p>
          </section>

          <div className="home-page__promo" data-node-id="9:4">
            <PromoSlideshow />
          </div>
        </main>
      </div>
    </div>
  );
}
