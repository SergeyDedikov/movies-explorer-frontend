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
    <PageWithAuthForm heading={"Добро пожаловать!"}>
      <AuthForm onSubmit={handleSubmit} name={"register"}>
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
          value={12345678}
          onChange={handleChange}
          type="password"
          label="Пароль"
          nameform={"register"}
          message="Что-то пошло не так..."
          isError={true}
        />
      </AuthForm>
      <div className="authentication__footer">
        <button
          className={`form__button form__button_register button`}
          type="submit"
          form="register"
        >
          Зарегистрироваться
        </button>
        <p className="authentication__text">
          Уже зарегистрированы?{" "}
          <span>
            <Link to="/signin" className="authentication__button button">
              Войти
            </Link>
          </span>
        </p>
      </div>
    </PageWithAuthForm>
  );
}

export default Register;
