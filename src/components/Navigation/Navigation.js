import { Link, NavLink } from "react-router-dom";

import "./Navigation.css";

function Navigation({ isBasePath, isLargeScreen, isVisibleMenu, onClick }) {
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
        <div className={`navigation__overlay`}></div>
        <nav className={`navigation__movies`}>
          <ul className="navigation__links navigation__links_movies">
            <li>
              <NavLink
                onClick={onClick}
                to="/"
                className={`navigation__link navigation__link_main wide-medium button`}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClick}
                to="/movies"
                className={`navigation__link navigation__link_movies button wide-medium`}
                activeclassname="active"
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onClick}
                to="/saved-movies"
                className={`navigation__link navigation__link_saved-movies button wide-medium`}
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
                onClick={onClick}
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
        <div className={`navigation__overlay hidden`}></div>
        <nav className={`navigation__movies`}>
          <ul className="navigation__links navigation__links_movies">
            <li>
              <NavLink
                to="/movies"
                className={`navigation__link navigation__link_movies button`}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-movies"
                className={`navigation__link navigation__link_saved-movies button`}
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
