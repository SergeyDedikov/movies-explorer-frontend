import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../hooks/form-validation";

function SearchForm(props) {
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
      console.log('Нужно ввести ключевое слово');
    } else {
      console.log(values);
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
        <input
          onChange={handleChange}
          className="search-form__input"
          type="search"
          name="search-movie"
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
