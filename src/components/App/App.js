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
  const [isFilterMovies, setIsFilterMovies] = useState(
    localStorage.getItem("filterMovies")
      ? JSON.parse(localStorage.getItem("filterMovies"))
      : false
  );
  const [allMovies, setAllMovies] = useState([]);
  const [localFoundMovies, setLocalFoundMovies] = useState([]);
  const [renderMovies, setRenderMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [renderSavedMovies, setRenderSavedMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);

  // -- Переменные для запросов
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchResult, setisSearchResult] = useState(true);
  const [isSearchError, setisSearchError] = useState(false);
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

  // -- Получим все фильмы
  useEffect(() => {
    setIsLoading(true);
    MoviesApi()
      .then((data) => {
        setAllMovies(data);
        // localStorage.setItem("allMovies", JSON.stringify(data));
      })
      .catch((err) => {
        setMessage(err);
        showInfoTooltip(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // -- Получим список найденных фильмов из localStorage
  useEffect(() => {
    let moviesLocal = localStorage.getItem("movies");
    if (moviesLocal) {
      // меняем отображение фильмов по фильтру
      if (isFilterMovies) {
        setLocalFoundMovies(filterShortMovies(JSON.parse(moviesLocal)));
      } else {
        setLocalFoundMovies(JSON.parse(moviesLocal));
      }
    } else {
      // иначе сохраним все
      setLocalFoundMovies(allMovies);
    }
  }, [allMovies]);

  // -- Получение списка сохранённых фильмов из нашего АПИ
  // и данных пользователя
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([api.getUserInfo(), api.getMovies()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(moviesData);
          // setRenderSavedMovies(moviesData);
        })
        .catch((err) => {
          setMessage(err);
          showInfoTooltip(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn]);

  // -- Отображение фильмов
  useEffect(() => {
    if (isFilterMovies) {
      setRenderMovies(filterShortMovies(localFoundMovies));
      setRenderSavedMovies(filterShortMovies(savedMovies));
    } else {
      setRenderMovies(localFoundMovies);
      setRenderSavedMovies(savedMovies);
    }
  }, [localFoundMovies, savedMovies]);

  // -- Отображение фильмов по фильтру чек-бокса
  useEffect(() => {
    if (isFilterMovies) {
      setRenderMovies(filterShortMovies(localFoundMovies));
      setRenderSavedMovies(filterShortMovies(savedMovies));
    } else {
      setRenderMovies(localFoundMovies);
      setRenderSavedMovies(savedMovies);
    }
  }, [isFilterMovies]);

  // -- Управление фильтром чек-бокса
  function handleChangeCheckbox() {
    setIsFilterMovies(!isFilterMovies);
  }

  function handleSearchMovies(query) {
    const { movie } = query;

    setIsLoading(true);
    setisSearchError(false);
    setisSearchResult(true);

    setFilterMovies(handlerMovieSearchQuery(localFoundMovies, movie));
    // сохраним найденные фильмы и значение фильтра в localStorage
    localStorage.setItem("movies", JSON.stringify(filterMovies));
    localStorage.setItem("filterMovies", JSON.stringify(isFilterMovies));

    setIsLoading(false);
    // меняем переменные результата поиска
    if (filterMovies.length > 0) {
      setLocalFoundMovies(filterMovies);
      // меняем отображение фильмов по фильтру
      if (isFilterMovies) {
        setLocalFoundMovies(filterShortMovies(filterMovies));
      } else {
        setLocalFoundMovies(filterMovies);
      }
      setisSearchResult(true);
    } else {
      setisSearchResult(false);
    }
  }

  function handleSearchSavedMovies(query) {
    const { movie } = query;
    setRenderSavedMovies(handlerMovieSearchQuery(savedMovies, movie));
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

  return (
    <CurentUserContext.Provider value={currentUser}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <Movies
              movies={renderMovies}
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
              movies={renderSavedMovies}
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
