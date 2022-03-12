import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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

  const [isLargeScreen, setIsLargeScreen] = useState(true);
  console.log(isLargeScreen);
  // созданим переменную для широкого экрана
  const mediaLargeScreen = window.matchMedia("(min-width: 1000px)");

  function handleWidthScreenChange(evt) {
    if (evt.matches) {
      setIsLargeScreen(true);
    } else {
      setIsLargeScreen(false);
    }
  }
  // слушатель переменной для широкого экрана
  mediaLargeScreen.addEventListener("change", (e) =>
    handleWidthScreenChange(e)
  );

  if (isHeaderPath) {
    return (
      <header className={`header ${!isBasePath && "header_background_none"}`}>
        <Logo place="header" />
        <Navigation isBasePath={isBasePath} isLargeScreen={isLargeScreen} />
      </header>
    );
  } else {
    return null;
  }
}

export default Header;
