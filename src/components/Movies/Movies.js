import { useEffect, useState } from "react";

import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import MoviesApi from "../../utils/MoviesApi";
import ResultBox from "../ResultBox/ResultBox";

function Movies() {
  const [movies, setMovies] = useState([]);
  let sortedMovies;
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState(true);
  const [isError, setIsError] = useState(false);

  // получение списка найденных фильмов из localStorage
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      setMovies(JSON.parse(localStorage.getItem("movies")));
    }
  }, []);

  // фильтрация фильмов по запросу
  function filterMovies(array, value) {
    return array.filter(function (el) {
      // создадим массив значений для поиска в них
      const arrayValues = [
        el.nameRU,
        el.nameEN,
        el.country,
        el.director,
        el.description,
      ];
      if (arrayValues.join(". ").toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

  function handleEndRequest() {
    setIsLoading(false);
    // меняем переменные результата поиска
    if (sortedMovies && sortedMovies.length > 0) {
      setMovies(sortedMovies);
      setIsResult(true);
    } else {
      setIsResult(false);
    }
  }

  function onSubmit(query) {
    setMovies([]);
    setIsLoading(true);
    setIsError(false);
    setIsResult(true);

    MoviesApi()
      .then((data) => {
        sortedMovies = filterMovies(data, query);

        // сохраним найденные фильмы в localStorage
        localStorage.setItem("movies", JSON.stringify(sortedMovies));
      })
      .catch((err) => {
        if (err) {
          setIsError(true);
        }
      })
      .finally(() => handleEndRequest());
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={onSubmit} />
      <ResultBox isResult={isResult} isError={isError} />
      <Preloader isLoading={isLoading} />
      <MoviesCardList movies={movies} />
    </main>
  );
}

export default Movies;
