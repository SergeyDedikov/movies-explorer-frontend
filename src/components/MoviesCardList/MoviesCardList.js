import { useEffect, useState } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import AddMoreMovies from "../AddMoreMovies/AddMoreMovies";

function MoviesCardList({ movies, isSavedMovies }) {
  const [moviesList, setMoviesList] = useState(movies);

  // созданим переменную для широкого экрана
  const mediaLargeScreen = window.matchMedia("(min-width: 1000px)");
  // созданим переменную для узкого экрана
  const mediaMobilScreen = window.matchMedia("(max-width: 500px)");

  const [isLargeScreen, setIsLargeScreen] = useState(mediaLargeScreen.matches);
  const [isMobilScreen, setIsMobilScreen] = useState(mediaMobilScreen.matches);

  function handleLargeScreenChange(evt) {
    if (evt.matches) {
      setIsLargeScreen(true);
    } else {
      setIsLargeScreen(false);
    }
  }

  function handleMobilScreenChange(evt) {
    if (evt.matches) {
      setIsMobilScreen(true);
    } else {
      setIsMobilScreen(false);
    }
  }

  // слушатель переменной для широкого экрана
  mediaLargeScreen.addEventListener("change", (e) =>
    handleLargeScreenChange(e)
  );
  // слушатель переменной для узкого экрана
  mediaMobilScreen.addEventListener("change", (e) =>
    handleMobilScreenChange(e)
  );

  // условие для отображения кнопки Ещё (временное)
  const isMoreMovies = movies.length > 11;

  // изменим число отображаемых карточек при разной ширине экрана
  useEffect(() => {
    if (isLargeScreen) {
      setMoviesList(movies.slice(0, 12));
    } else if (!isMobilScreen) {
      setMoviesList(movies.slice(0, 8));
    } else {
      setMoviesList(movies.slice(0, 5));
    }
  }, [isLargeScreen, isMobilScreen]);

  // изменим число отображаемых карточек
  // в "Сохранённых фильмах"
  // при узкой ширине экрана
  useEffect(() => {
    if (isSavedMovies && isMobilScreen) {
      setMoviesList(movies.slice(0, 2));
    }
  }, [isSavedMovies, isMobilScreen]);

  return (
    <section className="movies-card-list" aria-label="Список фильмов">
      <ul className="movies__list">
        {moviesList.map((movieItem) => (
          <MoviesCard
            key={movieItem.movieId}
            movie={movieItem}
            isSavedMovies={isSavedMovies}
          />
        ))}
      </ul>
      <AddMoreMovies isMoreMovies={isMoreMovies} />
    </section>
  );
}

export default MoviesCardList;
