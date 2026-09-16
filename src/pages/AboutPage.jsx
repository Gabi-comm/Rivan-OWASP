import { Link } from "react-router-dom";
import rivan from "../assets/rivan.jpg";
import "./AboutPage.css";

const PRINCIPLES = [
  {
    title: "Attacks, not slideshows",
    body: "Every topic ends in something you can run. Reading about an injection and watching one land are different kinds of understanding.",
  },
  {
    title: "Safe by construction",
    body: "Simulations are self-contained and clearly marked. Credentials, codes and customer data in these labs are fabricated.",
  },
  {
    title: "Defence follows attack",
    body: "Once you have seen what gets through, the guardrailing track covers what to put in its way.",
  },
];

export default function AboutPage() {
  return (
    <div className="site-layout__shell about-page">
      <section className="about-page__intro">
        <p className="about-page__eyebrow">About</p>
        <h1 className="about-page__heading">
          RivanCyber Institute
        </h1>
        <div className="about-page__accent" />
        <p className="about-page__lead">
          Rivan Simulation is the hands-on side of the RivanCyber Institute — a
          set of small, self-contained environments for practising the security
          problems that come with putting language models into real products.
        </p>
        <p className="about-page__body">
          Each simulation is a working replica of an ordinary web application
          with one thing quietly wrong with it. You interact with it the way a
          user would, watch the failure happen, then open the instrumentation to
          see exactly what the model was sent and why it behaved that way.
        </p>
        <Link className="about-page__cta" to="/category">
          Browse the categories →
        </Link>
      </section>

      <figure className="about-page__figure">
        <img src={rivan} alt="Rivan Security Inc. Academy" />
      </figure>

      <section className="about-page__principles">
        {PRINCIPLES.map((principle) => (
          <article className="principle" key={principle.title}>
            <h2 className="principle__title">{principle.title}</h2>
            <p className="principle__body">{principle.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
