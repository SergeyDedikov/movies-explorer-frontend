import { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.css";
import PageWithAuthForm from "../PageWithAuthForm/PageWithAuthForm";
import AuthForm from "../AuthForm/AuthForm";
import InputForm from "../InputForm/InputForm";

function Register() {
  const [inputValues, setInputValues] = useState({
    name: "Виталий",
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
    <PageWithAuthForm name={"register"} heading={"Добро пожаловать!"}>
      <AuthForm
        onSubmit={handleSubmit}
        name={"register"}
        textButtonSubmit={"Зарегистрироваться"}
      >
        <InputForm
          name="name"
          value={inputValues.name}
          onChange={handleChange}
          type="text"
          label="Имя"
          nameform={"register"}
        />
        <InputForm
          name="email"
          value={inputValues.email}
          onChange={handleChange}
          type="email"
          label="E-mail"
          nameform={"register"}
        />
        <InputForm
          name="password"
          value={inputValues.password}
          onChange={handleChange}
          type="password"
          label="Пароль"
          nameform={"register"}
          message="Что-то пошло не так..."
        />
      </AuthForm>
      <p className="authentication__text">
        Уже зарегистрированы?{" "}
        <span>
          <Link to="/signin" className="authentication__button button">
            Войти
          </Link>
        </span>
      </p>
    </PageWithAuthForm>
  );
}

export default Register;
