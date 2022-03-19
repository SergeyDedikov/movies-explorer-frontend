import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ResultBox from "../ResultBox/ResultBox";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  onSearchMovies,
  isSearchResult,
  isSearchError,
  isLoading,
  movies,
}) {
  // создадим массив с "нашими" фильмами
  const savedMovies = movies.filter((item) => item.owner === 111);

  return (
    <main className="saved-movies">
      <SearchForm onSearchMovies={onSearchMovies} />
      <ResultBox
        isSearchResult={isSearchResult}
        isSearchError={isSearchError}
      />
      <Preloader isLoading={isLoading} />
      <MoviesCardList movies={savedMovies} isSavedMovies={true} />
    </main>
  );
}

export default SavedMovies;
