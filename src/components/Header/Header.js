import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header header_background_none">
      <div className="header__logo"></div>
      <Navigation />
    </header>
  );
}

export default Header;
