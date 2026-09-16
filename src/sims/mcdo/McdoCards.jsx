import cardMcdelivery from "../../assets/mcdo/card-mcdelivery.jpeg";
import cardNxtgen from "../../assets/mcdo/card-nxtgen.jpeg";
import cardCareers from "../../assets/mcdo/card-careers.jpg";
import cardFamily from "../../assets/mcdo/card-family-activities.jpg";
import cardApp from "../../assets/mcdo/card-mcdelivery-app.jpeg";
import cardCharity from "../../assets/mcdo/card-charity.jpeg";

/** Reference: assets/reference/page-2.jpg. Nothing here is an attack - the
    site ships clean, and the only way a payload reaches the page is for someone
    to post one. See the Attacker tab. */
const CARDS = [
  { id: "mcdelivery", label: "McDelivery", image: cardMcdelivery, alt: "McDelivery rider" },
  {
    id: "nxtgen",
    label: "NXTGEN",
    image: cardNxtgen,
    alt: "An NXTGEN McDonald's store at dusk",
  },
  { id: "careers", label: "Careers", image: cardCareers, alt: "Three McDonald's crew members" },
  { id: "family", label: "Family Activities", image: cardFamily, alt: "Kids at a McDonald's family event" },
  { id: "app", label: "Download the McDelivery PH App", image: cardApp, alt: "The McDelivery app on a phone" },
  {
    id: "charity",
    label: "Charity",
    image: cardCharity,
    alt: "A Ronald McDonald House charity home",
  },
];

export default function McdoCards() {
  return (
    <section className="mcdo-cards" aria-label="Featured">
      <div className="mcdo-cards__grid">
        {CARDS.map((card) => (
          <figure className="mcdo-card" key={card.id}>
            <img className="mcdo-card__image" src={card.image} alt={card.alt} />
            <figcaption className="mcdo-card__label">{card.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
