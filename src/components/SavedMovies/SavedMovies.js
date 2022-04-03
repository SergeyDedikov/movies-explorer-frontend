import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ResultBox from "../ResultBox/ResultBox";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  onSearchMovies,
  onChangeCheckbox,
  isFilterMovies,
  isSearchResult,
  isSearchError,
  isLoading,
  movies,
  onMovieLike,
}) {
  return (
    <main className="saved-movies">
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
        isSavedMovies={true}
        onMovieLike={onMovieLike}
      />
    </main>
  );
}

export default SavedMovies;
