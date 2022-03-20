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
import api from "../../utils/MainApi";

function App() {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
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

  // конечная обработка запроса
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

  function handleSearchMovies(query) {
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

  // Отправляем запрос в API на создание карточки фильма

  function createMovie(data) {
    console.log(data);
    api
      .createMovie(data)
      .then((newMovie) => {
        setSavedMovies((state) => state.push(newMovie));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // удаление карточки из сохранённых фильмов

  function handleMovieDelete(id) {
    api
      .deleteMovie(id)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // установка/снятие лайка

  function handleMovieLike(movie) {
    // Проверяем, есть ли этот фильм среди сохранённых
    const isLiked = savedMovies.some((i) => i.movieId === movie.id);

    function getLikedMovie() {
      let likedMovie;
      savedMovies.forEach((item) => {
        console.log(item);
        if (item.movieId === movie.id) {
          likedMovie = item;
        } else {
          return;
        }
      });
      return likedMovie;
    }
    console.log(getLikedMovie());

    if (!isLiked) {
      createMovie(movie);
    } else {
      handleMovieDelete(getLikedMovie()._id);
    }
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
              savedMovies={savedMovies}
              onSearchMovies={handleSearchMovies}
              isSearchResult={isSearchResult}
              isSearchError={isSearchError}
              isLoading={isLoading}
              onMovieLike={handleMovieLike}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              movies={savedMovies}
              onSearchMovies={handleSearchMovies}
              isSearchResult={isSearchResult}
              isSearchError={isSearchError}
              isLoading={isLoading}
              onMovieLike={handleMovieDelete}
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
