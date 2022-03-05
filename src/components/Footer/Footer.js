import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text footer__text_place_description">
        Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
      </p>
      <div className="footer__underline">
        <p className="footer__text footer__text_place_copyright">
          &copy;&nbsp;2022
        </p>

        <nav>
          <ul className="footer__social-links">
            <li>
              <a
                className="footer__text footer__text_place_social-link"
                href="https://practicum.yandex.ru"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                className="footer__text footer__text_place_social-link"
                href="https://github.com/SergeyDedikov"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                className="footer__text footer__text_place_social-link"
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
