import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <a className="navigation__link" href="#about-project">
            О проекте
          </a>
        </li>
        <li>
          <a className="navigation__link" href="#technology">
            Технологии
          </a>
        </li>
        <li>
          <a className="navigation__link" href="#student">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
