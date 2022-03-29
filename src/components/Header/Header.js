import { useLocation } from "react-router-dom";
import { useState } from "react";

import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";

function Header({ loggedIn }) {
  const { pathname } = useLocation();

  const isBasePath = pathname === "/";
  const isHeaderPath =
    pathname === "/" ||
    pathname === "/movies" ||
    pathname === "/saved-movies" ||
    pathname === "/profile";

  // созданим переменную для широкого экрана
  const mediaLargeScreen = window.matchMedia("(min-width: 1000px)");

  const [isLargeScreen, setIsLargeScreen] = useState(mediaLargeScreen.matches);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  function onChangeVisibleMenu() {
    setIsVisibleMenu(!isVisibleMenu);
  }

  function handleWidthScreenChange(evt) {
    if (evt.matches) {
      setIsLargeScreen(true);
      setIsVisibleMenu(false);
    } else {
      setIsLargeScreen(false);
    }
  }
  // слушатель переменной для широкого экрана
  mediaLargeScreen.addEventListener("change", (e) =>
    handleWidthScreenChange(e)
  );

  const burgerMenuClassName = `header__burger-menu button ${
    isLargeScreen || (pathname === "/" && !loggedIn) ? "hidden" : ""
  } ${isVisibleMenu ? "header__burger-menu_type_close" : ""}
  ${loggedIn && pathname === "/" ? "header__burger-menu_place_main" : ""}
  `;

  if (isHeaderPath) {
    return (
      <header className={`header ${!isBasePath && "header_background_none"}`}>
        <Logo place="header" />
        <Navigation
          loggedIn={loggedIn}
          isBasePath={isBasePath}
          isLargeScreen={isLargeScreen}
          isVisibleMenu={isVisibleMenu}
          onClick={onChangeVisibleMenu}
        />
        <button
          onClick={onChangeVisibleMenu}
          className={burgerMenuClassName}
          type="button"
        ></button>
      </header>
    );
  } else {
    return null;
  }
}

export default Header;
