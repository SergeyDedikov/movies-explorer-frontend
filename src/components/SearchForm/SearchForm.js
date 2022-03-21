import { useRef } from "react";

import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/form-validation";

function SearchForm({ onSearchMovies }) {
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

  const inputRef = useRef(null); // прямой доступ к полю ввода

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      console.log("Нужно ввести ключевое слово");
    } else {
      onSearchMovies(values.movie);
    }
    resetForm();
    inputRef.current.value = "";
  }

  return (
    <section className="serch-form-container" aria-label="Форма поиска">
      <form
        onSubmit={handleSubmit}
        id="search-movies"
        className="form search-form"
        name="search-movies"
        noValidate
      >
        <div className="search-form__icon"></div>
        <input
          ref={inputRef}
          onChange={handleChange}
          className="search-form__input"
          type="search"
          name="movie"
          placeholder="Фильм"
          required
        ></input>
        <button className="search-form__button button" type="submit">
          {""}
        </button>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
