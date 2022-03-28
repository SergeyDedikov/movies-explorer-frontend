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
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import MoviesApi from "../../utils/MoviesApi";
import api from "../../utils/MainApi";
import auth from "../../utils/auth";
import {
  handlerMovieSearchQuery,
  filterShortMovies,
  convertDataMovies,
} from "../../utils/utils";

function App() {
  // -- Переменная состояния авторизации
  const [loggedIn, setLoggedIn] = useState(false);
  // -- Переменная состояния профиля
  const [currentUser, setCurrentUser] = useState(defaultUser);

  // -- Переменные состояния фильмов
  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  // -- Переменные наличия данных в localstorage
  // let isAllMovies = localStorage.getItem("beatfilm-movies");
  // let isFoundMovies = localStorage.getItem("found-movies");
  const [isFilterMovies, setIsFilterMovies] = useState(
    localStorage.getItem("filter-movies")
      ? JSON.parse(localStorage.getItem("filter-movies"))
      : false
  );

  // -- Переменные для запросов
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(true);
  const [isSearchError, setIsSearchError] = useState(false);
  const [isApiError, setIsApiError] = useState(false);
  const [message, setMessage] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isOk, setIsOk] = useState(null);

  // -- Навигация
  const navigate = useNavigate();

  function goToMovies() {
    navigate("/movies");
  }

  function goToHome() {
    navigate("/");
  }

  // -- Функции попапов

  function showInfoTooltip(set) {
    // -- отобразим инфо-попап
    setIsInfoTooltipOpen(true);
    // -- выберем его тип
    setIsOk(set);
  }

  function closeAllPopups() {
    // -- установим значения по умолчанию
    setIsInfoTooltipOpen(false);
    setTimeout(() => {
      setMessage("");
    }, 1000);
  }

  // -- Проверяем токен пользователя
  function handleTokenCheck() {
    api
      .getUserInfo()
      .then((res) => {
        if (res) {
          // меняем переменные состояния авторизации
          setLoggedIn(true);
          setCurrentUser(res);
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

  // -- Редактирование данных пользователя
  function handleUpdateUser(data) {
    setIsApiError(false);
    api
      .setUserInfo(data)
      .then((newData) => {
        setMessage("Данные обновлены успешно!");
        setCurrentUser(newData);
        showInfoTooltip(true);
      })
      .catch((err) => {
        console.log(err);
        showInfoTooltip(false);
        setMessage(err);
      });
  }

  // -- Выход из системы
  function onSignOut() {
    auth.logout();
    setLoggedIn(false);
    goToHome();
  }

  // -- Получим все фильмы из АПИ
  function getAllMovies() {
    setIsLoading(true);
    MoviesApi()
      .then((data) => {
        setAllMovies(data);
        // сохраним в localStorage
        localStorage.setItem("beatfilm-movies", JSON.stringify(data));
      })
      .catch((err) => {
        setMessage(err);
        showInfoTooltip(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // -- Получим список всех фильмов из localStorage
  function getLocalAllMovies() {
    return JSON.parse(localStorage.getItem("beatfilm-movies"));
  }

  // -- Получим список найденных фильмов из localStorage
  function getLocalFoundMovies() {
    return JSON.parse(localStorage.getItem("found-movies"));
  }

  // -- Получим список сохранённых фильмов из localStorage
  function getLocalSavedMovies() {
    return JSON.parse(localStorage.getItem("saved-movies"));
  }

  // -- Сохранение фильмов в localStorage
  function setLocalSavedMovies(data) {
    localStorage.setItem("saved-movies", JSON.stringify(data));
  }

  // -- Получение сохранённых фильмов из нашего АПИ
  function getSavedMovies() {
    setIsLoading(true);
    api
      .getMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setLocalSavedMovies(movies);
      })
      .catch((err) => {
        setMessage(err);
        showInfoTooltip(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //console.log(isFoundMovies);
  console.log(getLocalFoundMovies());
  // console.log(getLocalSavedMovies());

  // -- Рендер фильмов при авторизации
  useEffect(() => {
    if (loggedIn) {
      getSavedMovies();
      let moviesLocal = localStorage.getItem("found-movies");
      if (moviesLocal) {
        // меняем отображение фильмов по фильтру
        if (isFilterMovies) {
          setFoundMovies(filterShortMovies(getLocalFoundMovies()));
        } else {
          setFoundMovies(getLocalFoundMovies());
        }
      }
    }
  }, [loggedIn]);

  // -- Отображение фильмов по чек-боксу
  useEffect(() => {
    let moviesLocal = localStorage.getItem("found-movies");
    if (moviesLocal) {
      if (isFilterMovies) {
        setFoundMovies(filterShortMovies(getLocalFoundMovies()));
      } else {
        setFoundMovies(getLocalFoundMovies());
      }
    }
    let savedMoviesLocal = localStorage.getItem("saved-movies");
    if (savedMoviesLocal) {
      if (isFilterMovies) {
        setSavedMovies(filterShortMovies(getLocalSavedMovies()));
      } else {
        setSavedMovies(getLocalSavedMovies());
      }
    }
  }, [isFilterMovies]);

  // -- Управление фильтром чек-бокса
  function handleChangeCheckbox() {
    setIsFilterMovies(!isFilterMovies);
  }

  function handleSearchMovies(query) {
    const { movie } = query;

    setIsLoading(true);
    setIsSearchError(false);
    setIsSearchResult(true);

    if (!localStorage.getItem("beatfilm-movies")) {
      getAllMovies();
    }

    let filterMovies = handlerMovieSearchQuery(getLocalAllMovies(), movie);
    console.log(filterMovies);
    // сохраним найденные фильмы и значение фильтра в localStorage
    localStorage.setItem("found-movies", JSON.stringify(filterMovies));
    localStorage.setItem("filter-movies", JSON.stringify(isFilterMovies));

    setIsLoading(false);
    // меняем переменные результата поиска
    if (filterMovies && filterMovies.length > 0) {
      setFoundMovies(filterMovies);
      setIsSearchResult(true);
      // меняем отображение фильмов по фильтру
      /* if (isFilterMovies) {
        setFoundMovies(filterShortMovies(filterMovies));
      } else {
        setFoundMovies(filterMovies);
      } */
    } else {
      setIsSearchResult(false);
    }
  }

  function handleSearchSavedMovies(query) {
    const { movie } = query;
    setSavedMovies(handlerMovieSearchQuery(getLocalSavedMovies(), movie));
  }

  // Отправляем запрос в API на создание карточки фильма

  function createMovie(data) {
    setIsLoading(true);
    api
      .createMovie(convertDataMovies(data))
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .then(() => {
        // сохраним обновлённые данные в localStorage
        setLocalSavedMovies(savedMovies);
      })
      .catch((err) => {
        setMessage(err);
        showInfoTooltip(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // удаление карточки из сохранённых фильмов

  function handleMovieDelete(movie) {
    setIsLoading(true);
    api
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
      })
      .then(() => {
        // сохраним обновлённые данные в localStorage
        setLocalSavedMovies(savedMovies);
      })
      .catch((err) => {
        setMessage(err);
        showInfoTooltip(false);
      })
      .finally(() => {
        setIsLoading(false);
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

  return (
    <CurentUserContext.Provider value={currentUser}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <Movies
              movies={foundMovies}
              savedMovies={savedMovies}
              onSearchMovies={handleSearchMovies}
              onChangeCheckbox={handleChangeCheckbox}
              isFilterMovies={isFilterMovies}
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
              onSearchMovies={handleSearchSavedMovies}
              onChangeCheckbox={handleChangeCheckbox}
              isFilterMovies={isFilterMovies}
              isSearchResult={isSearchResult}
              isSearchError={isSearchError}
              isLoading={isLoading}
              onMovieLike={handleMovieDelete}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              onUpdateUser={handleUpdateUser}
              message={message}
              isApiError={isApiError}
              onSignOut={onSignOut}
            />
          }
        />
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
      <InfoTooltip
        isOk={isOk}
        isOpen={isInfoTooltipOpen}
        message={message}
        onClose={closeAllPopups}
      />
    </CurentUserContext.Provider>
  );
}

export default App;
