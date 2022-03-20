import { useState } from "react";
import { Link } from "react-router-dom";

import "./Register.css";
import PageWithAuthForm from "../PageWithAuthForm/PageWithAuthForm";
import AuthForm from "../AuthForm/AuthForm";
import InputForm from "../InputForm/InputForm";
import { useFormWithValidation } from "../../hooks/form-validation";

function Register({ onSubmit }) {
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
          <InputForm
            name="name"
            onChange={handleChange}
            type="text"
            label="Имя"
            nameform={"register"}
          />
          <InputForm
            name="email"
            onChange={handleChange}
            type="email"
            label="E-mail"
            nameform={"register"}
          />
          <InputForm
            name="password"
            onChange={handleChange}
            type="password"
            label="Пароль"
            nameform={"register"}
            // messageError={}
            // isError={}
          />
        </fieldset>
      </form>
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
