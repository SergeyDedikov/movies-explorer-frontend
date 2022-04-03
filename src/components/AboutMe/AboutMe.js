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
            Мой родной город&nbsp;&mdash; Чайковский, Пермский край. Учился
            по&nbsp;специальности &laquo;Техническое обслуживание вычислительной
            техники&raquo;. Работал в&nbsp;различных сферах: издательство,
            реклама и&nbsp;дизайн, нефтегазовая сфера, услуги для бизнеса. Мне
            нравится инструментальная музыка и&nbsp;добрые люди. Есть пёс
            и&nbsp;кошка. Занимаюсь велокроссом, зимой&nbsp;&mdash; беговые
            лыжи. В&nbsp;2021 году поступил на&nbsp;курс обучения
            &laquo;Веб-разработчик&raquo; от&nbsp;Я.Практикума
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
