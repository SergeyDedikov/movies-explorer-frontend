import "./Section.css";
import SectionTitle from "../SectionTitle/SectionTitle.js";

function Section({ name, title, children }) {
  return (
    <section className={`${name} section`} aria-label={title}>
      <SectionTitle id={name} title={title} />
      {children}
    </section>
  );
}

export default Section;
