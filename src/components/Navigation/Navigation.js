import { Link } from "react-router-dom";

import "./Navigation.css";

function Navigation({ isBasePath, isLargeScreen }) {
  if (isBasePath) {
    return (
      <div className="navigation-main">
        <nav className="navigation__authentication">
          <ul className="navigation__links navigation__links_authentication">
            <li>
              <Link
                to="/signup"
                className="navigation__link navigation__link_register button"
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="navigation__link navigation__link_login button"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div className="navigation">
        <div className="navigation__overlay"></div>
        <nav className={`navigation__movies`}>
          <ul className="navigation__links navigation__links_movies">
            <li>
              <Link
                to="/movies"
                className="navigation__link navigation__link_movies"
              >
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                to="/saved-movies"
                className="navigation__link navigation__link_saved-movies"
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
        </nav>
        <nav className={`navigation__profile`}>
          <ul className="navigation__links navigation__links_profile">
            <li>
              <Link
                to="/profile"
                className="navigation__link navigation__link_profile"
              >
                Аккаунт
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="navigation__link navigation__link_profile-button"
              >
                {""}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
