import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  CurentUserContext,
  defaultUser,
} from "../../contexts/CurrentUserContext";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedAuthRoute from "../ProtectedAuthRoute/ProtectedAuthRoute";
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
  const sessionStorageAuth = JSON.parse(sessionStorage.getItem("loggedIn"));
  const [loggedIn, setLoggedIn] = useState(sessionStorageAuth);
  // -- Переменная состояния профиля
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const [currentUser, setCurrentUser] = useState(
    sessionStorageUser ? sessionStorageUser : defaultUser
  );

  // -- Переменные состояния для страницы Фильмы
  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [filteredFoundMovies, setFilteredFoundMovies] = useState([]);
  const [keyWordFoundMovies, setKeyWordFoundMovies] = useState("");
  const [isFilterFoundMovies, setIsFilterFoundMovies] = useState(
    localStorage.getItem("filter-found-movies")
      ? JSON.parse(localStorage.getItem("filter-found-movies"))
      : false
  );

  // -- Переменные состояния для страницы Сохранённые фильмы
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [isFilterSavedMovies, setIsFilterSavedMovies] = useState(
    localStorage.getItem("filter-saved-movies")
      ? JSON.parse(localStorage.getItem("filter-saved-movies"))
      : false
  );

  // -- Функции обновления состояний переменных фильмов
  const updateAllMovies = (movies) => {
    setAllMovies(movies);
    localStorage.setItem("beatfilm-movies", JSON.stringify(movies));
  };
  const updateFoundMovies = (movies) => {
    setFoundMovies(movies);
    localStorage.setItem("found-movies", JSON.stringify(movies));
  };
  const updateFilteredFoundMovies = (movies) => {
    setFilteredFoundMovies(movies);
    localStorage.setItem("filtered-found-movies", JSON.stringify(movies));
  };
  const updateKeyWordFoundMovies = (keyWord) => {
    setKeyWordFoundMovies(keyWord);
    localStorage.setItem("keyword-found-movies", keyWord);
  };
  const updateFilterFoundMovies = (boolean) => {
    setIsFilterFoundMovies(boolean);
    localStorage.setItem("filter-found-movies", boolean);
  };
  const updateSavedMovies = (movies) => {
    setSavedMovies(movies);
    localStorage.setItem("saved-movies", JSON.stringify(movies));
  };
  const updateFilteredSavedMovies = (movies) => {
    setFilteredSavedMovies(movies);
    localStorage.setItem("filtered-saved-movies", JSON.stringify(movies));
  };

  // -- Обновление состояний при первом рендере
  useEffect(() => {
    updateAllMovies(
      JSON.parse(localStorage.getItem("beatfilm-movies") || "[]")
    );
    updateFoundMovies(JSON.parse(localStorage.getItem("found-movies") || "[]"));
    updateFilteredFoundMovies(
      JSON.parse(localStorage.getItem("filtered-found-movies") || "[]")
    );
    updateKeyWordFoundMovies(
      localStorage.getItem("keyword-found-movies") || ""
    );
    updateFilterFoundMovies(
      JSON.parse(localStorage.getItem("filter-found-movies") || false)
    );
    updateFilteredSavedMovies(
      JSON.parse(localStorage.getItem("saved-movies") || "[]")
    )
  }, []);

  // -- Переменные для запросов
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchResult, setIsSearchResult] = useState(true);
  const [isSearchError, setIsSearchError] = useState(false);
  const [isApiError, setIsApiError] = useState(false);
  const [message, setMessage] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isOk, setIsOk] = useState(null);

  // -- Навигация
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
  async function handleTokenCheck() {
    await api
      .getUserInfo()
      .then((res) => {
        if (res) {
          // меняем переменные состояния авторизации и пользователя
          setLoggedIn(true);
          sessionStorage.setItem("loggedIn", "true");
          setCurrentUser(res);
          sessionStorage.setItem("currentUser", JSON.stringify(res));
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
          handleTokenCheck()
            .then(() => {
              // переходим на страницу Фильмы
              console.log("Вход выполнен!");
              navigate("/movies");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
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
    localStorage.clear();
    sessionStorage.clear();
    setLoggedIn(false);
    goToHome();
    setCurrentUser({});
    setAllMovies([]);
    setFoundMovies([]);
    setFilteredFoundMovies([]);
    setIsFilterFoundMovies(false);
    setKeyWordFoundMovies('');
    setSavedMovies([]);
    setFilteredSavedMovies([]);
  }

  // -- Получение сохранённых фильмов из нашего АПИ
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      api
        .getMovies()
        .then((movies) => {
          updateSavedMovies(movies);
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
  // -- Отображение сохранённых фильмов
  useEffect(() => {
    updateSavedMovies(savedMovies);
    let moviesLocal = localStorage.getItem("saved-movies");
    if (moviesLocal) {
      if (isFilterSavedMovies) {
        updateFilteredSavedMovies(filterShortMovies(getLocalSavedMovies()));
      } else {
        updateFilteredSavedMovies(getLocalSavedMovies());
      }
    }
  }, [savedMovies, isFilterSavedMovies, pathname]);

  // -- Отображение найденных фильмов по чек-боксу
  useEffect(() => {
    let moviesLocal = localStorage.getItem("found-movies");
    if (moviesLocal) {
      if (isFilterFoundMovies) {
        updateFilteredFoundMovies(filterShortMovies(getLocalFoundMovies()));
      } else {
        updateFilteredFoundMovies(getLocalFoundMovies());
      }
    }
  }, [isFilterFoundMovies]);

  // -- Управление фильтром чек-бокса Фильмы
  function handleChangeCheckboxFoundMovies() {
    updateFilterFoundMovies(!isFilterFoundMovies);
  }

  // -- Управление фильтром чек-бокса Сохранённые фильмы
  function handleChangeCheckboxSavedMovies() {
    setIsFilterSavedMovies(!isFilterSavedMovies);
  }

  // -- Поиск фильмов --

  function handleSearch(query) {
    setIsLoading(true);
    updateFilteredFoundMovies([]);
    setIsSearchError(false);
    setIsSearchResult(true);
    const { movie } = query;
    let filterMovies = handlerMovieSearchQuery(getLocalAllMovies(), movie);
    updateFoundMovies(filterMovies);
    updateKeyWordFoundMovies(movie);
    // меняем переменные результата поиска
    if (filterMovies && filterMovies.length > 0) {
      setIsSearchResult(true);
      // меняем отображение фильмов по фильтру
      if (isFilterFoundMovies) {
        updateFilteredFoundMovies(filterShortMovies(filterMovies));
      } else {
        updateFilteredFoundMovies(filterMovies);
      }
    } else {
      setIsSearchResult(false);
    }
    setIsLoading(false);
  }

  // -- Сброс результатов поиска
  useEffect(() => {
    setIsSearchResult(true);
    setIsSearchError(false);
  }, [pathname]);

  // -- Получим все фильмы из АПИ
  async function getAllMovies(query) {
    setIsLoading(true);
    await MoviesApi()
      .then((data) => {
        // сохраним в localStorage
        updateAllMovies(data);
      })
      .then(() => handleSearch(query))
      .catch((err) => {
        setMessage(err);
        showInfoTooltip(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSearchMovies(query) {
    // загрузим все фильмы при первом поиске
    if (!allMovies.length || allMovies.length === 0) {
      getAllMovies(query);
    } else {
      handleSearch(query);
    }
  }

  // -- Поиск среди сохранённых фильмов

  function handleSearchSavedMovies(query) {
    const { movie } = query;
    updateFilteredSavedMovies([]);
    setIsSearchError(false);
    setIsSearchResult(true);
    let filterMovies = handlerMovieSearchQuery(getLocalSavedMovies(), movie);
    updateFilteredSavedMovies(filterMovies);
    if (filterMovies && filterMovies.length > 0) {
      setIsSearchResult(true);
      // меняем отображение фильмов по фильтру
      if (isFilterSavedMovies) {
        setFilteredSavedMovies(filterShortMovies(filterMovies));
      } else {
        setFilteredSavedMovies(filterMovies);
      }
    } else {
      setIsSearchResult(false);
    }
  }

  // Отправляем запрос в API на создание карточки фильма
  function createMovie(data) {
    api
      .createMovie(convertDataMovies(data))
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        setMessage(err);
        showInfoTooltip(false);
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
        setMessage(err);
        showInfoTooltip(false);
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
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Movies}
              movies={filteredFoundMovies}
              savedMovies={savedMovies}
              onSearchMovies={handleSearchMovies}
              onChangeCheckbox={handleChangeCheckboxFoundMovies}
              isFilterMovies={isFilterFoundMovies}
              keyWordFoundMovies={keyWordFoundMovies}
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
            <ProtectedRoute
              loggedIn={loggedIn}
              component={SavedMovies}
              movies={filteredSavedMovies}
              onSearchMovies={handleSearchSavedMovies}
              onChangeCheckbox={handleChangeCheckboxSavedMovies}
              isFilterMovies={isFilterSavedMovies}
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
            <ProtectedRoute
              loggedIn={loggedIn}
              component={Profile}
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
            <ProtectedAuthRoute
              loggedIn={loggedIn}
              component={Login}
              onSubmit={onLogin}
              message={message}
              isApiError={isApiError}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedAuthRoute
              loggedIn={loggedIn}
              component={Register}
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
