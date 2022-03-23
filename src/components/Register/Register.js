import { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.css";
import PageWithAuthForm from "../PageWithAuthForm/PageWithAuthForm";
import AuthForm from "../AuthForm/AuthForm";
import InputForm from "../InputForm/InputForm";
import { useFormWithValidation } from "../../hooks/form-validation";

function Register({ onSubmit, isApiError, message }) {
  // подключаем валидацию формы
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      console.log(errors);
    } else {
      onSubmit({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    }
  }

  return (
    <PageWithAuthForm heading={"Добро пожаловать!"}>
      <form
        onSubmit={handleSubmit}
        id="register"
        name="register"
        className={`form form_register`}
        noValidate
      >
        <fieldset className="form__input-container">
          <label className="form__input-label">
            Имя
            <input
              onChange={handleChange}
              id="register-name"
              className={`form__input ${
                errors.name !== "" ? "form__input_type_error" : ""
              }`}
              type="text"
              name="name"
              minLength="2"
              maxLength="30"
              required
              pattern="[A-Za-zА-Яа-яЁё0-9- ]+"
              title="Русские или латинские буквы, цифры, пробел, дефис"
            />
            <span id="name-error" className="form__error">
              {errors.name}
            </span>
          </label>

          <label className="form__input-label">
            E-mail
            <input
              onChange={handleChange}
              id="register-email"
              className={`form__input ${
                errors.email !== "" ? "form__input_type_error" : ""
              }`}
              type="email"
              name="email"
              required
            />
            <span id="email-error" className="form__error">
              {errors.email}
            </span>
          </label>

          <label className="form__input-label">
            Пароль
            <input
              onChange={handleChange}
              id="register-password"
              className={`form__input ${
                errors.password !== "" ? "form__input_type_error" : ""
              }`}
              type="password"
              name="password"
              required
            />
            <span id="password-error" className="form__error">
              {errors.password}
            </span>
          </label>
        </fieldset>
      </form>
      <div className="authentication__footer">
        <p
          className={`authentication__text authentication__text_error ${
            !isApiError ? "authentication__text_hidden" : ""
          }`}
        >
          {message}
        </p>
        <button
          className={`form__button form__button_register button ${
            !isValid ? "form__button_disabled" : ""
          }`}
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
