const BASE_URL_MOVIES_API = "https://api.nomoreparties.co";

export function handlerMovieSearchQuery(arrayMovies, query) {

  // фильтрация фильмов по запросу
  return arrayMovies.filter(function (el) {
    // создадим массив значений для поиска в них
    const arrayValues = [
      el.nameRU,
      el.nameEN,
      el.country,
      el.director,
      el.description,
    ];
    if (arrayValues.join(". ").toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  });
}

// подстрахуемся от пустых значений
export function convertDataMovies(data) {

  let newData = {
    country: data.country || "Нет данных",
    director: data.director || "Нет данных",
    duration: data.duration || 0,
    year: data.year || '0000',
    description: data.description,
    image: BASE_URL_MOVIES_API + data.image.url,
    trailerLink: data.trailerLink,
    nameRU: data.nameRU,
    nameEN: data.nameEN || data.nameRU,
    thumbnail: BASE_URL_MOVIES_API + data.image.formats.thumbnail.url,
    movieId: data.id,
  };
  return newData;
}

