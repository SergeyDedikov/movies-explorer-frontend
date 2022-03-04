import "./SectionTitle.css";

function SectionTitle({ title, id }) {
  return (
    <h2 className="section-title" id={id}>
      {title}
    </h2>
  );
}

export default SectionTitle;
