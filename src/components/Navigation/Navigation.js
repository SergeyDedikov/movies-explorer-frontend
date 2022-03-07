import "./Navigation.css";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navigation__movies">
        <ul className="navigation__links navigation__links_movies">
          <li>
            <a
              className="navigation__link navigation__link_movies"
              href="#movies"
            >
              Фильмы
            </a>
          </li>
          <li>
            <a
              className="navigation__link navigation__link_saved-movies"
              href="#saved-movies"
            >
              Сохранённые фильмы
            </a>
          </li>
        </ul>
      </nav>
      <nav className="navigation__authentication">
        <ul className="navigation__links navigation__links_authentication">
          <li>
            <a
              className="navigation__link navigation__link_register"
              href="#register"
            >
              Регистрация
            </a>
          </li>
          <li>
            <a
              className="navigation__link navigation__link_login"
              href="#login"
            >
              Войти
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
