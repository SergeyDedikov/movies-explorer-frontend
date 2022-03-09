import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

// временно импортируем постеры к фильмам
import movieImage01 from "../../images/pic-movie-01.jpg";
import movieImage02 from "../../images/pic-movie-02.jpg";
import movieImage03 from "../../images/pic-movie-03.jpg";
import movieImage04 from "../../images/pic-movie-04.jpg";
import movieImage05 from "../../images/pic-movie-05.jpg";
import movieImage06 from "../../images/pic-movie-06.jpg";
import movieImage07 from "../../images/pic-movie-07.jpg";
import movieImage08 from "../../images/pic-movie-08.jpg";
import movieImage09 from "../../images/pic-movie-09.jpg";
import movieImage10 from "../../images/pic-movie-10.jpg";
import movieImage11 from "../../images/pic-movie-11.jpg";
import movieImage12 from "../../images/pic-movie-12.jpg";

function MoviesCardList() {
  // массив данных о фильмах (временный)
  const movies = [
    {
      movieId: 1,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage01,
      owner: 100,
    },
    {
      movieId: 2,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage02,
      owner: 100,
    },
    {
      movieId: 3,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage03,
      owner: 111,
    },
    {
      movieId: 4,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage04,
      owner: 100,
    },
    {
      movieId: 5,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage05,
      owner: 111,
    },
    {
      movieId: 6,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage06,
      owner: 100,
    },
    {
      movieId: 7,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage07,
      owner: 100,
    },
    {
      movieId: 8,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage08,
      owner: 100,
    },
    {
      movieId: 9,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage09,
      owner: 100,
    },
    {
      movieId: 10,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage10,
      owner: 111,
    },
    {
      movieId: 11,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage11,
      owner: 100,
    },
    {
      movieId: 12,
      nameRU: "33 слова о дизайне",
      duration: 107,
      image: movieImage12,
      owner: 100,
    },
  ];

  return (
    <section className="movies-card-list" aria-label="Список фильмов">
      <ul className="movies__list">
        {movies.map((movieItem) => (
          <MoviesCard key={movieItem.movieId} movie={movieItem} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
