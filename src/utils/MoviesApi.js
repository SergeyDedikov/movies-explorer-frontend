import { BASE_URL_MOVIES_API } from "./constants";

export default function MoviesApi() {
  return fetch(`${BASE_URL_MOVIES_API}/beatfilm-movies`, {
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
