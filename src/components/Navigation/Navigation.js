import { Link, NavLink } from "react-router-dom";

import "./Navigation.css";

function Navigation({ isBasePath, isLargeScreen, isVisibleMenu }) {
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
  } else if (!isLargeScreen) {
    return (
      <div
        className={`navigation ${!isVisibleMenu ? "navigation_hidden" : ""}`}
      >
        <div
          className={`navigation__overlay ${isLargeScreen ? "hidden" : ""}`}
        ></div>
        <nav className={`navigation__movies`}>
          <ul className="navigation__links navigation__links_movies">
            <li>
              <NavLink
                to="/"
                className={`navigation__link navigation__link_main wide-medium button ${
                  isLargeScreen ? "hidden" : ""
                }`}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={`navigation__link navigation__link_movies button ${
                  !isLargeScreen ? "wide-medium" : ""
                }`}
                activeclassname="active"
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-movies"
                className={`navigation__link navigation__link_saved-movies button ${
                  !isLargeScreen ? "wide-medium" : ""
                }`}
                activeclassname="active"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav className={`navigation__profile`}>
          <ul className="navigation__links navigation__links_profile">
            <li>
              <Link
                to="/profile"
                className="navigation__link navigation__link_profile button"
              >
                Аккаунт
                <div className="navigation__link_profile-button"></div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div className={`navigation`}>
        <div
          className={`navigation__overlay ${isLargeScreen ? "hidden" : ""}`}
        ></div>
        <nav className={`navigation__movies`}>
          <ul className="navigation__links navigation__links_movies">
            <li>
              <NavLink
                to="/movies"
                className={`navigation__link navigation__link_movies button ${
                  !isLargeScreen ? "wide-medium" : ""
                }`}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-movies"
                className={`navigation__link navigation__link_saved-movies button ${
                  !isLargeScreen ? "wide-medium" : ""
                }`}
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav className={`navigation__profile`}>
          <ul className="navigation__links navigation__links_profile">
            <li>
              <Link
                to="/profile"
                className="navigation__link navigation__link_profile button"
              >
                Аккаунт
                <div className="navigation__link_profile-button"></div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
