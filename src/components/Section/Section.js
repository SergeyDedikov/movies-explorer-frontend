import "./Section.css";

function Section({ name, children }) {
  return (
    <section className={`section section_name_${name}`}>{children}</section>
  );
}

export default Section;
