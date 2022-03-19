import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import ResultBox from "../ResultBox/ResultBox";

function Movies({
  onSearchMovies,
  isSearchResult,
  isSearchError,
  isLoading,
  movies,
}) {
  return (
    <main className="movies">
      <SearchForm onSearchMovies={onSearchMovies} />
      <ResultBox
        isSearchResult={isSearchResult}
        isSearchError={isSearchError}
      />
      <Preloader isLoading={isLoading} />
      <MoviesCardList movies={movies} />
    </main>
  );
}

export default Movies;
