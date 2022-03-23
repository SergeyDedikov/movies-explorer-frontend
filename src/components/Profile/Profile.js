import { useContext, useState, useEffect, useRef } from "react";

import "./Profile.css";
import { CurentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../hooks/form-validation";

function Profile({ onUpdateUser, onSignOut, isApiError, message }) {
  // контекст пользователя
  const currentUser = useContext(CurentUserContext);

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

  // прямой доступ к полям формы
  const inputName = useRef(null);
  const inputEmail = useRef(null);

  useEffect(() => {
    // Получаем данные пользователя для полей формы
    if (currentUser) {
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  // установим в поля формы данные пользователя
  useEffect(() => {
    inputName.current.value = values.name;
    inputEmail.current.value = values.email;
  }, [values]);

  // совпадение полей с первоначальными данными
  const isMatchesValue =
    values.name === currentUser.name && values.email === currentUser.email;

  // Передаём значения управляемых компонентов во внешний обработчик
  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
    }
  }

  return (
    <section className="profile" aria-label="Профиль">
      <h1 className="profile__greeting">{`Привет, ${currentUser.name}!`}</h1>

      <form
        onSubmit={handleSubmit}
        id="profile"
        name="profile"
        className={`form form_profile`}
        noValidate
      >
        <fieldset className="profile__input-container">
          <label className="profile__input-label">
            Имя
            <input
              ref={inputName}
              onChange={handleChange}
              id="profile-name"
              className={`profile__input ${
                errors.name && errors.name !== ""
                  ? "profile__input_type_error"
                  : ""
              }`}
              type="text"
              name="name"
              minLength="2"
              maxLength="30"
              required
              pattern="[A-Za-zА-Яа-яЁё0-9- ]+"
            />
            <span id="name-error" className="profile__error">
              {errors.name}
            </span>
          </label>
          <label className="profile__input-label">
            E-mail
            <input
              ref={inputEmail}
              onChange={handleChange}
              id="profile-email"
              className={`profile__input ${
                errors.email && errors.email !== ""
                  ? "profile__input_type_error"
                  : ""
              }`}
              type="email"
              name="email"
              required
            />
            <span id="email-error" className="profile__error">
              {errors.email}
            </span>
          </label>
        </fieldset>
      </form>
      <button
        disabled={isMatchesValue || !isValid}
        className="profile__button profile__button_edit button"
        type="submit"
        form="profile"
      >
        Редактировать
      </button>
      <button
        onClick={onSignOut}
        className="profile__button profile__button_exit button"
        type="button"
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
