import "./Techs.css";
import Section from "../Section/Section";

function Techs() {
  return (
    <Section name={"technology"} title={"Технологии"}>
      <h3 className="technology__title">7 технологий</h3>
      <p className="technology__subtitle">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
        применили в&nbsp;дипломном проекте.
      </p>
      <ul className="technology__list">
        <li className="technology__name">HTML</li>
        <li className="technology__name">CSS</li>
        <li className="technology__name">JS</li>
        <li className="technology__name">React</li>
        <li className="technology__name">Git</li>
        <li className="technology__name">Express.js</li>
        <li className="technology__name">mongoDB</li>
      </ul>
    </Section>
  );
}

export default Techs;
