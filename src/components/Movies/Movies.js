import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import ResultBox from "../ResultBox/ResultBox";

function Movies({
  onSearchMovies,
  onChangeCheckbox,
  isFilterMovies,
  isSearchResult,
  isSearchError,
  isLoading,
  movies,
  savedMovies,
  onMovieLike,
}) {
  return (
    <main className="movies">
      <SearchForm
        onSearchMovies={onSearchMovies}
        onChangeCheckbox={onChangeCheckbox}
        isFilterMovies={isFilterMovies}
      />
      <ResultBox
        isSearchResult={isSearchResult}
        isSearchError={isSearchError}
      />
      <Preloader isLoading={isLoading} />
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        onMovieLike={onMovieLike}
      />
    </main>
  );
}

export default Movies;
