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
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
            экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю
            слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по&nbsp;веб&#8209;разработке, начал
            заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
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
