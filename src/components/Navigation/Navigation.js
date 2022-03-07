import "./Navigation.css";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navigation__movies"></nav>
      <nav className="navigation__authentication">
        <ul className="navigation__links">
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
