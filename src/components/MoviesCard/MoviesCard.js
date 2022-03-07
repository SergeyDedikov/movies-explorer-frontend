import "./MoviesCard.css";

function MoviesCard({ title, image, duration }) {
  return (
    <li className="movies-card">
      <h4 className="movies-card__title">{title}</h4>
      <p className="movies-card__duration">{duration}</p>
      <div className="movies-card__like"></div>
      <img className="movies__image" src={image} alt={title} />
    </li>
  );
}

export default MoviesCard;
