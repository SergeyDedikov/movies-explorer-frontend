import "./MoviesCard.css";

function MoviesCard({ movie, isSavedMovies, savedMovies, onMovieLike }) {
  const BASE_URL = "https://api.nomoreparties.co";
  const posterURL = BASE_URL + movie.image.url;

  // преобразуем длительность фильма в часы с минутами
  function formatMinutes(value) {
    let minuteTime = value; // минуты
    let hourTime = 0; // часы

    if (minuteTime > 60) {
      hourTime = parseInt(minuteTime / 60); // получим часы
      minuteTime = parseInt(minuteTime % 60); // остаток минут
    }

    let result;

    if (minuteTime > 0) {
      result = minuteTime + "м";
    }
    if (hourTime > 0) {
      result = hourTime + "ч " + result;
    }
    return result;
  }

  // определим есть ли фильм среди сохранённых
  const isLiked = savedMovies.some((i) => i.movieId === movie.id);

  // переменная в `className` для кнопки лайка и удаления
  const movieLikeButtonClassName = `movies-card__button-like ${
    isLiked && "movies-card__button-like_active"
  } ${isSavedMovies && "movies-card__button-like_delete"}`;

  function handleLikeClick() {
    onMovieLike(movie);
  }

  return (
    <li>
      <figure className="movies-card">
        <figcaption className="movies-card_info">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__duration">
            {formatMinutes(movie.duration)}
          </p>
          <button
            onClick={handleLikeClick}
            className={`${movieLikeButtonClassName} button`}
          ></button>
        </figcaption>
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="movies-card__image"
            src={posterURL}
            alt={movie.nameRU}
          />
        </a>
      </figure>
    </li>
  );
}

export default MoviesCard;
