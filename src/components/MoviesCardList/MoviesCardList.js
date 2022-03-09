import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import AddMoreMovies from "../AddMoreMovies/AddMoreMovies";

function MoviesCardList({ movies }) {
  return (
    <section className="movies-card-list" aria-label="Список фильмов">
      <ul className="movies__list">
        {movies.map((movieItem) => (
          <MoviesCard key={movieItem.movieId} movie={movieItem} />
        ))}
      </ul>
      <AddMoreMovies movies={movies} />
    </section>
  );
}

export default MoviesCardList;
