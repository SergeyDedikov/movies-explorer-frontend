import { useEffect, useState } from "react";

import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import MoviesApi from "../../utils/MoviesApi";

function Movies() {
  const [movies, setMovies] = useState([]);
  console.log(movies);
  const [isLoading, setIsLoading] = useState(false);

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

  function onSubmit(query) {
    setIsLoading(true);
    MoviesApi()
      .then((data) => {
        let sortedMovies = filterMovies(data, query);
        setMovies(sortedMovies);

        // сохраним найденные фильмы в localStorage
        localStorage.setItem("movies", JSON.stringify(sortedMovies));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className="movies">
      <SearchForm onSubmit={onSubmit} />
      <Preloader isLoading={isLoading} />
      <MoviesCardList movies={movies} />
    </main>
  );
}

export default Movies;
