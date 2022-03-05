import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav>
        <ul className="portfolio__links">
          <li className="portfolio__list-item">
            <a
              className="portfolio__link"
              href="https://github.com/SergeyDedikov/how-to-learn"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт
            </a>
            <div className="portfolio__icon-link"></div>
          </li>
          <li className="portfolio__list-item">
            <a
              className="portfolio__link"
              href="https://github.com/SergeyDedikov/russian-travel"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт
            </a>
            <div className="portfolio__icon-link"></div>
          </li>
          <li className="portfolio__list-item">
            <a
              className="portfolio__link"
              href="https://github.com/SergeyDedikov/mesto"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение
            </a>
            <div className="portfolio__icon-link"></div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Portfolio;
