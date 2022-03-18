// запрос к сервису beatfilm-movies
const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

export default function MoviesApi() {
  return fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        const message =
          data.message || "При запросе списка фильмов произошла ошибка";
        return Promise.reject(message);
      });
    }
  });
}
