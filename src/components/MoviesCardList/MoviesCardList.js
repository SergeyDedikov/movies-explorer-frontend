import { useEffect, useState } from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import AddMoreMovies from "../AddMoreMovies/AddMoreMovies";

function MoviesCardList({ movies, isSavedMovies }) {
  const [moviesList, setMoviesList] = useState(movies);

  // условие для отображения кнопки Ещё (временное)
  const isMoreMovies = movies.length > 11;

  // изменим число отображаемых карточек при разной ширине экрана
  useEffect(() => {
    if (window.matchMedia("(min-width: 1000px)").matches) {
      setMoviesList(movies.slice(0, 12));
    } else if (window.matchMedia("(min-width: 500px)").matches) {
      setMoviesList(movies.slice(0, 8));
    }
  });

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
