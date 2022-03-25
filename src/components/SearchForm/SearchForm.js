import { useEffect, useRef, useState } from "react";

import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/form-validation";

function SearchForm({ onSearchMovies, onChangeCheckbox, isFilterMovies }) {
  const inputRef = useRef(null); // прямой доступ к полю ввода
  const [isChecked, setIsChecked] = useState(isFilterMovies);

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

  function handleChangeCheckbox(e) {
    setIsChecked(!isChecked);
    onChangeCheckbox(!isChecked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      console.log("Нужно ввести ключевое слово");
    } else {
      onSearchMovies({
        movie: values.movie,
        // filterMovies: isChecked,
      });
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
        <label className="search-form__input-label">
          <input
            ref={inputRef}
            onChange={handleChange}
            id="search-movie"
            className={`search-form__input`}
            type="search"
            name="movie"
            placeholder="Фильм"
            required
          />
          <span id="search-error" className="search-form__error">
            {!isValid ? "Нужно ввести ключевое слово" : ""}
          </span>
        </label>

        <button className="search-form__button button" type="submit">
          {""}
        </button>
        <FilterCheckbox onChange={handleChangeCheckbox} isChecked={isChecked}/>
      </form>
    </section>
  );
}

export default SearchForm;
