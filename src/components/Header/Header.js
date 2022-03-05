import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <nav className="header__nav-movies"></nav>
      <nav className="header__nav-authentication">
        <ul className="header__nav-links">
          <li>
            <a className="header__link header__link_register" href="#register">
              Регистрация
            </a>
          </li>
          <li>
            <a className="header__link header__link_login" href="#login">
              Войти
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
