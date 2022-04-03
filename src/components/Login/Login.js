import { Link } from "react-router-dom";

import "./Login.css";
import PageWithAuthForm from "../PageWithAuthForm/PageWithAuthForm";
import { useFormWithValidation } from "../../hooks/form-validation";

function Login({ onSubmit, isApiError, message }) {
  // подключаем валидацию формы
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      console.log(errors);
    } else {
      onSubmit({
        email: values.email,
        password: values.password,
      });
    }
  }

  return (
    <PageWithAuthForm heading={"Рады видеть!"}>
      <form
        onSubmit={handleSubmit}
        id="login"
        name="login"
        className={`form form_login`}
        noValidate
      >
        <fieldset className="form__input-container">
          <label className="form__input-label">
            E-mail
            <input
              onChange={handleChange}
              id="login-email"
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
              id="login-password"
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
      <div className="authentication__footer authentication__footer_login">
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
