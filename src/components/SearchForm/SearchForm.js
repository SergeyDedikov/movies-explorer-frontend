import { useEffect, useRef, useState } from "react";

import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/form-validation";

function SearchForm({
  onSearchMovies,
  onChangeCheckbox,
  isFilterMovies,
  keyWordFoundMovies,
}) {
  const [isVisibleError, setIsVisibleError] = useState(false);
  const inputRef = useRef(null); // прямой доступ к полю ввода
  const [isChecked, setIsChecked] = useState(isFilterMovies);

  // -- Выведем в поле поиска предыдущее значение
  useEffect(() => {
    inputRef.current.value = keyWordFoundMovies || '';
  }, [keyWordFoundMovies]);

  // подключаем валидацию формы
  const { values, handleChange, isValid } = useFormWithValidation();

  function handleChangeCheckbox(e) {
    setIsChecked(!isChecked);
    onChangeCheckbox();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      setIsVisibleError(true);
      console.log("Нужно ввести ключевое слово");
    } else {
      onSearchMovies({
        movie: values.movie,
      });
      setIsVisibleError(false);
    }
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
            {!isValid && isVisibleError ? "Нужно ввести ключевое слово" : ""}
          </span>
        </label>

        <button className="search-form__button button" type="submit">
          {""}
        </button>
        <FilterCheckbox onChange={handleChangeCheckbox} isChecked={isChecked} />
      </form>
    </section>
  );
}

export default SearchForm;
