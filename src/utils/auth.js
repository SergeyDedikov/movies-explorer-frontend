import { BASE_URL_MAIN_API } from "./constants";

const BASE_URL = "http://localhost:3001";
// const BASE_URL = "https://api.movies-favorite.nomoredomains.work";

class Auth {
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

  register({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._checkResult);
  }

  login({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        password,
        email,
      }),
    }).then((res) => {
      if (res.ok) {
        return res;
      } else {
        return res.json().then((data) => {
          const message = data.message || "Что-то пошло не так!";
          return Promise.reject(message);
        });
      }
    });
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResult);
  }
}

const auth = new Auth(BASE_URL);

export default auth;
