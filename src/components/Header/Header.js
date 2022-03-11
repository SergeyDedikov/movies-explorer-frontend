import { useLocation } from "react-router-dom";

import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

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
        <Logo place="header" />
        <Navigation />
      </header>
    );
  } else {
    return null;
  }
}

export default Header;
