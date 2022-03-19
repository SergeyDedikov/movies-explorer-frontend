import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import MoviesApi from "../../utils/MoviesApi";

function App() {
  const [movies, setMovies] = useState([]);
  let sortedMovies;
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchResult, setisSearchResult] = useState(true);
  const [isSearchError, setisSearchError] = useState(false);

  // получение списка найденных фильмов из localStorage
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      setMovies(JSON.parse(localStorage.getItem("movies")));
    }
  }, []);

  // фильтрация фильмов по запросу
  function filterMovies(array, value) {
    return array.filter(function (el) {
      // создадим массив значений для поиска в них
      const arrayValues = [
        el.nameRU,
        el.nameEN,
        el.country,
        el.director,
        el.description,
      ];
      if (arrayValues.join(". ").toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

  function handleEndRequest() {
    setIsLoading(false);
    // меняем переменные результата поиска
    if (sortedMovies && sortedMovies.length > 0) {
      setMovies(sortedMovies);
      setisSearchResult(true);
    } else {
      setisSearchResult(false);
    }
  }

  function onSearchMovies(query) {
    setMovies([]);
    setIsLoading(true);
    setisSearchError(false);
    setisSearchResult(true);

    MoviesApi()
      .then((data) => {
        sortedMovies = filterMovies(data, query);

        // сохраним найденные фильмы в localStorage
        localStorage.setItem("movies", JSON.stringify(sortedMovies));
      })
      .catch((err) => {
        if (err) {
          setisSearchError(true);
        }
      })
      .finally(() => handleEndRequest());
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <Movies
              movies={movies}
              onSearchMovies={onSearchMovies}
              isSearchResult={isSearchResult}
              isSearchError={isSearchError}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              movies={movies}
              onSearchMovies={onSearchMovies}
              isSearchResult={isSearchResult}
              isSearchError={isSearchError}
              isLoading={isLoading}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
