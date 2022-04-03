import "./AboutMe.css";
import Section from "../Section/Section.js";
import photo from "../../images/student-photo.jpg";
import Portfolio from "../Portfolio/Portfolio.js";

function AboutMe() {
  return (
    <Section name={"student"} title={"Студент"}>
      <div className="student__info-container">
        <div className="student__description">
          <h3 className="student__title">Сергей</h3>
          <p className="student__subtitle">Веб-разработчик, 43 года</p>
          <p className="student__paragraph">
            Я&nbsp;родился и&nbsp;живу в&nbsp;городе Чайковском Пермского края,
            учился по&nbsp;специальности &laquo;Техническое обслуживание
            вычилительной техники&raquo;. Я&nbsp;люблю слушать инструментальную
            музыку. Занимаюсь кроссом на&nbsp;велосипеде, зимой &mdash;
            на&nbsp;лыжах. Есть собака и&nbsp;кошка. В&nbsp;2021 году поступил
            на&nbsp;курсы &laquo;Веб-разработчик&raquo; Я.Практикума
            и&nbsp;в&nbsp;апреле 2022 защитил дипломный проект. Хочу стать
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
        <img
          src={photo}
          className="student__photo"
          alt="Фотография студента"
        ></img>
      </div>
      <Portfolio />
    </Section>
  );
}

export default AboutMe;
