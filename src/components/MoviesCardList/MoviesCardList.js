import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import AddMoreMovies from "../AddMoreMovies/AddMoreMovies";

function MoviesCardList({ movies, isSavedMovies }) {
  // условие для отображения кнопки Ещё (временное)
  const isMoreMovies = movies.length > 11;

  return (
    <section className="movies-card-list" aria-label="Список фильмов">
      <ul className="movies__list">
        {movies.map((movieItem) => (
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
