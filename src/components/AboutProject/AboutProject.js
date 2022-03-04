import "./AboutProject.css";
import Section from "../Section/Section";
import SectionTitle from "../SectionTitle/SectionTitle.js";

function AboutProject() {
  return (
    <Section name={"about-project"}>
      <SectionTitle id={"about-project"} title={"О проекте"} />
      <ul className="description">
        <li className="description__container">
          <p className="description__title">
            Дипломный проект включал 5&nbsp;этапов
          </p>
          <p className="description__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и&nbsp;финальные доработки.
          </p>
        </li>
        <li className="description__container">
          <p className="description__title">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </p>
          <p className="description__paragraph">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="chrono">
        <p className="chrono__bar chrono__bar_position_left">1 неделя</p>
        <p className="chrono__bar chrono__bar_position_rigth">4 недели</p>
        <p className="chrono__description">Back-end</p>
        <p className="chrono__description">Front-end</p>
      </div>
    </Section>
  );
}

export default AboutProject;
