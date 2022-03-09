import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { movies } from "../../utils/constants.js";

function SavedMovies() {
  // создадим массив с "нашими" фильмами
  const savedMovies = movies.filter((item) => item.owner === 111);

  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={savedMovies} isSavedMovies={true} />
    </main>
  );
}

export default SavedMovies;
