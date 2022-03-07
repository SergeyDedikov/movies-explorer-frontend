import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return(
    <ul className="movies-card-list">
      <MoviesCard title={""} image={""} duration={""} />
    </ul>
  );
}

export default MoviesCardList;
