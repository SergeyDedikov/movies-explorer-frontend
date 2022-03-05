import "./Section.css";
import SectionTitle from "../SectionTitle/SectionTitle.js";

function Section({ name, title, children }) {
  return (
    <section className={`section section_name_${name}`}>
      <SectionTitle id={name} title={title} />
      {children}
    </section>
  );
}

export default Section;
