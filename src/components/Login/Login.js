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
    <PageWithAuthForm name={"login"} heading={"Рады видеть!"}>
      <AuthForm
        onSubmit={handleSubmit}
        name={"login"}
        textButtonSubmit={"Войти"}
      >
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
      <p className="authentication__text">
        Ещё не зарегистрированы?{" "}
        <span>
          <Link to="/signup" className="authentication__button button">
            Регистрация
          </Link>
        </span>
      </p>
    </PageWithAuthForm>
  );
}

export default Login;
