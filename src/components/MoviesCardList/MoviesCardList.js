import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  return (
    <section className="movies-card-list" aria-label="Список фильмов">
      <ul className="movies__list">
        {movies.map((movieItem) => (
          <MoviesCard key={movieItem.movieId} movie={movieItem} />
        ))}
      </ul>
      <button className="movies-card-list__add button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
