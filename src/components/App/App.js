import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  CurentUserContext,
  defaultUser,
} from "../../contexts/CurrentUserContext";
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
import auth from "../../utils/auth";
import { handlerMovieSearchQuery, convertDataMovies } from "../../utils/utils";

function App() {
  // -- Переменная состояния авторизации
  const [loggedIn, setLoggedIn] = useState(false);
  // -- Переменная состояния профиля
  const [currentUser, setCurrentUser] = useState(defaultUser);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  let sortedMovies;
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchResult, setisSearchResult] = useState(true);
  const [isSearchError, setisSearchError] = useState(false);
  const [isApiError, setIsApiError] = useState(false);
  const [message, setMessage] = useState("");

  // получение списка найденных фильмов из localStorage
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      setMovies(JSON.parse(localStorage.getItem("movies")));
    }
  }, []);

  // получение списка сохранённых фильмов из нашего АПИ
  // и данных пользователя
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getMovies()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(moviesData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  /* useEffect(() => {
    api
      .getMovies()
      .then((moviesData) => {
        setSavedMovies(moviesData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); */

  const navigate = useNavigate();

  function goToMovies() {
    navigate("/movies");
  }

  function goToHome(){
    navigate("/");
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
        sortedMovies = handlerMovieSearchQuery(data, query);

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
    api
      .createMovie(convertDataMovies(data))
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // удаление карточки из сохранённых фильмов

  function handleMovieDelete(movie) {
    api
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
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
        if (item.movieId === movie.id) {
          likedMovie = item;
        } else {
          return;
        }
      });
      return likedMovie;
    }

    if (!isLiked) {
      createMovie(movie);
    } else {
      handleMovieDelete(getLikedMovie());
    }
  }

  // -- Проверяем токен пользователя
  function handleTokenCheck() {
    api
      .getUserInfo()
      .then((res) => {
        if (res) {
          // меняем переменные состояния авторизации
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Проверка наличия токена
  useEffect(() => {
    if (!loggedIn) {
      handleTokenCheck();
    }
  }, []);

  // -- Вход в систему
  function onLogin(data) {
    setIsApiError(false);
    auth
      .login(data)
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          console.log("Вход выполнен!");
        }
      })
      .then(() => goToMovies()) // переходим на страницу Фильмы
      .catch((err) => {
        console.log(err);
        setIsApiError(true);
        setMessage(err);
      });
  }

  // -- Регистрация пользователя
  function onRegister(data) {
    setIsApiError(false);
    auth
      .register(data)
      .then((res) => {
        console.log(res);
        if (res.statusCode !== 400) {
          console.log("Регистрация успешна!");
          onLogin(data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsApiError(true);
        setMessage(err);
      });
  }

  // -- Выход из системы
  function onSignOut() {
    auth.logout();
    setLoggedIn(false);
    goToHome();
  }

  return (
    <CurentUserContext.Provider value={currentUser}>
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
        <Route path="/profile" element={<Profile onSignOut={onSignOut} />} />
        <Route
          path="/signin"
          element={
            <Login
              onSubmit={onLogin}
              message={message}
              isApiError={isApiError}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              onSubmit={onRegister}
              message={message}
              isApiError={isApiError}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </CurentUserContext.Provider>
  );
}

export default App;
