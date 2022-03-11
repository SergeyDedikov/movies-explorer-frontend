import { Link, useLocation } from "react-router-dom";

import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header() {
  const { pathname } = useLocation();

  const isBasePath = pathname === "/";
  const isHeaderPath =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  if (isHeaderPath) {
    return (
      <header className={`header ${!isBasePath && "header_background_none"}`}>
        <Link to="/" className="header__logo"></Link>
        <Navigation />
      </header>
    );
  } else {
    return null;
  }
}

export default Header;
