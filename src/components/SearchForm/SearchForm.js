import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="serch-form-container" aria-label="Форма поиска">
      <form id="search-movies" className="search-form" name="search-movies">
        <div className="search-form__icon"></div>
        <input
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
