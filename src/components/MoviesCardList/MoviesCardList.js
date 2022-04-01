import { useEffect, useState } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import AddMoreMovies from "../AddMoreMovies/AddMoreMovies";
import {
  NUMBER_ADDED_CARDS_MIDDLE_SCREEN,
  NUMBER_ADDED_CARDS_MOBIL_SCREEN,
  NUMBER_ADDED_CARDS_WIDE_SCREEN,
  NUMBER_CARDS_MIDDLE_SCREEN,
  NUMBER_CARDS_MOBIL_SCREEN,
  NUMBER_CARDS_WIDE_SCREEN,
} from "../../utils/constants";

function MoviesCardList({ movies, isSavedMovies, savedMovies, onMovieLike }) {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    setMoviesList(movies);
  }, [movies]);

  // созданим переменную для широкого экрана
  const mediaLargeScreen = window.matchMedia("(min-width: 1000px)");
  // созданим переменную для узкого экрана
  const mediaMobilScreen = window.matchMedia("(max-width: 500px)");

  const [isLargeScreen, setIsLargeScreen] = useState(mediaLargeScreen.matches);
  const [isMobilScreen, setIsMobilScreen] = useState(mediaMobilScreen.matches);

  // условие для отображения кнопки Ещё (исключим страницу с сохранёнными фильмами)
  const isMoreMovies = movies.length > moviesList.length && !isSavedMovies;

  // число добавляемых карточек
  const [numberAddMovies, setNumberAddMovies] = useState(0);

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
    setTimeout(handleLargeScreenChange(e), 500)
  );
  // слушатель переменной для узкого экрана
  mediaMobilScreen.addEventListener("change", (e) =>
    setTimeout(handleMobilScreenChange(e), 500)
  );

  // изменим число отображаемых и добавляемых карточек при разной ширине экрана
  // (исключим страницу с сохранёнными фильмами)
  useEffect(() => {
    if (!isSavedMovies && movies.length > 0) {
      if (isLargeScreen) {
        setMoviesList(movies.slice(0, NUMBER_CARDS_WIDE_SCREEN));
        setNumberAddMovies(NUMBER_ADDED_CARDS_WIDE_SCREEN);
      } else if (!isMobilScreen) {
        setMoviesList(movies.slice(0, NUMBER_CARDS_MIDDLE_SCREEN));
        setNumberAddMovies(NUMBER_ADDED_CARDS_MIDDLE_SCREEN);
      } else {
        setMoviesList(movies.slice(0, NUMBER_CARDS_MOBIL_SCREEN));
        setNumberAddMovies(NUMBER_ADDED_CARDS_MOBIL_SCREEN);
      }
    }
  }, [movies, isLargeScreen, isMobilScreen]);

  // добавление новых карточек
  function handleAddMoreMovies(numberCards) {
    // определим разницу длины массивов
    let delta;
    if (movies.length > 0) {
      delta = movies.length - moviesList.length;
    }

    // вычленим добавляемые карточки в отдельный массив
    let addMovies = [];

    function sliceAddMovies(newNumber) {
      addMovies = movies.slice(
        moviesList.length,
        moviesList.length + newNumber
      );
    }

    if (movies.length === 0 && moviesList.length === 0 && delta === 0) {
      return;
    } else if (delta < numberCards) {
      numberCards = delta;
    }

    sliceAddMovies(numberCards);
    // добавим новый массив в стейт
    setMoviesList((state) => state.concat(addMovies));
  }

  return (
    <section className="movies-card-list" aria-label="Список фильмов">
      <ul className="movies__list">
        {moviesList.map((movieItem) => (
          <MoviesCard
            key={isSavedMovies ? movieItem._id : movieItem.id}
            movie={movieItem}
            isSavedMovies={isSavedMovies}
            savedMovies={savedMovies}
            onMovieLike={onMovieLike}
          />
        ))}
      </ul>
      <AddMoreMovies
        onAddMoreMovies={handleAddMoreMovies}
        numberAddMovies={numberAddMovies}
        isMoreMovies={isMoreMovies}
      />
    </section>
  );
}

export default MoviesCardList;
