import { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import PageWithAuthForm from "../PageWithAuthForm/PageWithAuthForm";
import AuthForm from "../AuthForm/AuthForm";
import InputForm from "../InputForm/InputForm";

function Login() {
  const [inputValues, setInputValues] = useState({
    email: "pochta@yandex.ru",
    password: "",
  });

  function handleChange(e) {
    setInputValues((values) => {
      return { ...values, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PageWithAuthForm heading={"Рады видеть!"}>
      <AuthForm onSubmit={handleSubmit} name={"login"}>
        <InputForm
          name="email"
          value={inputValues.email}
          onChange={handleChange}
          type="email"
          label="E-mail"
          nameform={"login"}
        />
        <InputForm
          name="password"
          value={inputValues.password}
          onChange={handleChange}
          type="password"
          label="Пароль"
          nameform={"login"}
        />
      </AuthForm>
      <div className="authentication__footer authentication__footer_login">
        <button
          className={`form__button form__button_login button`}
          type="submit"
          form="login"
        >
          Войти
        </button>
        <p className="authentication__text">
          Ещё не зарегистрированы?{" "}
          <span>
            <Link to="/signup" className="authentication__button button">
              Регистрация
            </Link>
          </span>
        </p>
      </div>
    </PageWithAuthForm>
  );
}

export default Login;
