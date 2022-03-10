import { Link, useLocation } from "react-router-dom";

import "./Navigation.css";

function Navigation() {
  const { pathname } = useLocation();
  const isBasePath = pathname === "/";

  return (
    <div className="navigation">
      <nav
        className={`navigation__movies ${isBasePath && "navigation_hidden"}`}
      >
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
      <nav
        className={`navigation__authentication ${
          !isBasePath && "navigation_hidden"
        }`}
      >
        <ul className="navigation__links navigation__links_authentication">
          <li>
            <Link
              to="/register"
              className="navigation__link navigation__link_register"
            >
              Регистрация
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="navigation__link navigation__link_login"
            >
              Войти
            </Link>
          </li>
        </ul>
      </nav>
      <nav
        className={`navigation__profile ${isBasePath && "navigation_hidden"}`}
      >
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

export default Navigation;
