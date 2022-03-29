import { BASE_URL_MAIN_API } from "./constants";

const BASE_URL = "http://localhost:3001";

class MainApi {
  constructor(url) {
    this._url = url;
    this._headers = {
      "Content-Type": "application/json",
    };
    this._credentials = "include";
  }

  _checkResult = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        const message = data.message || "Что-то пошло не так!";
        return Promise.reject(message);
      });
    }
  };

  getMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResult);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResult);
  }

  setUserInfo({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResult);
  }

  createMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify(data),
    }).then(this._checkResult);
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResult);
  }
}

const api = new MainApi(BASE_URL);

export default api;
