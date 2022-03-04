import "./AboutMe.css";
import Section from "../Section/Section.js";
import SectionTitle from "../SectionTitle/SectionTitle.js";
import photo from "../../images/student-photo.jpg";

function AboutMe() {
  return (
    <Section name={"student"}>
      <SectionTitle id={"student"} title={"Студент"} />

      <div className="student__info">
        <img
          src={photo}
          className="student__photo"
          alt="Фотография студента"
        ></img>
        <h3 className="student__title">Сергей</h3>
        <p className="student__subtitle">Веб-разработчик, 43 года</p>
        <p className="student__paragraph">
          Я&nbsp;родился и&nbsp;живу в&nbsp;городе Чайковском Пермского края,
          учился по&nbsp;специальности &laquo;Техническое обслуживание
          вычилительной техники&raquo;. Я&nbsp;люблю слушать инструментальную
          музыку. Занимаюсь кроссом на&nbsp;велосипеде, зимой &mdash;
          на&nbsp;лыжах. Есть собака и&nbsp;кошка. В&nbsp;2021 году поступил
          на&nbsp;курсы &laquo;Веб-разработчик&raquo; Я.Практикума. Хочу стать
          кодером в&nbsp;хорошей компании.
        </p>

        <ul className="student__social-links">
          <li>
            <a
              className="student__social-link"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              className="student__social-link"
              href="https://github.com/SergeyDedikov"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}

export default AboutMe;
