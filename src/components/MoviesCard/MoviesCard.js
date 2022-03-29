import { BASE_URL_MOVIES_API } from "../../utils/constants";
import { formatMinutes } from "../../utils/utils";
import "./MoviesCard.css";

function MoviesCard({ movie, isSavedMovies, savedMovies, onMovieLike }) {
  let isLiked;
  let posterURL;
  if (!isSavedMovies) {
    // определим есть ли фильм среди сохранённых
    // console.log(savedMovies, movie.id);
    isLiked = savedMovies.some((i) => i.movieId === movie.id);
    // изменим адрес ссылки постера
    posterURL = BASE_URL_MOVIES_API + movie.image.url;
  } else {
    posterURL = movie.image;
  }

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
