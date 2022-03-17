import { useLocation } from "react-router-dom";

import "./Footer.css";

function Footer() {
  const { pathname } = useLocation();

  const isFooterPath =
    pathname === "/" || pathname === "/movies" || pathname === "/saved-movies";

  if (isFooterPath) {
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
  } else {
    return null;
  }
}

export default Footer;
