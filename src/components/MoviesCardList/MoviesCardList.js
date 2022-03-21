import { useEffect, useState } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import AddMoreMovies from "../AddMoreMovies/AddMoreMovies";

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

  // условие для отображения кнопки Ещё
  const isMoreMovies = movies.length > moviesList.length;

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

  // изменим число отображаемых карточек
  // в "Сохранённых фильмах"
  // при узкой ширине экрана
  useEffect(() => {
    if (isSavedMovies && isMobilScreen) {
      setMoviesList(movies.slice(0, 2));
    }
  }, [movies, isSavedMovies, isMobilScreen]);

  // число добавляемых карточек
  const [numberAddMovies, setNumberAddMovies] = useState(0);

  // изменим число отображаемых и добавляемых карточек при разной ширине экрана
  useEffect(() => {
    if (movies.length > 0) {
      if (isLargeScreen) {
        setMoviesList(movies.slice(0, 12));
        setNumberAddMovies(3);
      } else if (!isMobilScreen) {
        setMoviesList(movies.slice(0, 8));
        setNumberAddMovies(2);
      } else {
        setMoviesList(movies.slice(0, 5));
        setNumberAddMovies(2);
      }
    }
  }, [movies, isLargeScreen, isMobilScreen]);

  // добавление новых карточек
  function handleAddMoreMovies(n) {
    // определим разницу длины массивов
    let delta;
    if (movies.length > 0) {
      delta = movies.length - moviesList.length;
    }

    // вычленим добавляемые карточки в отдельный массив
    let addMovies = [];

    function sliceAddMovies(m) {
      addMovies = movies.slice(moviesList.length, moviesList.length + m);
    }

    if (movies.length === 0 && moviesList.length === 0 && delta === 0) {
      return;
    } else if (delta < n) {
      n = delta;
    }

    sliceAddMovies(n);
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
