import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <div className="form-container">
      <form id="search-movies" className="search-form" name="search-movies">
        <div className="search-form__icon"></div>
        <input
          className="search-form__input"
          type="search"
          name="movie"
          placeholder="Фильм"
        ></input>
        <button className="search-form__button button" type="submit">
          {""}
        </button>
        <FilterCheckbox />
      </form>
    </div>
  );
}

export default SearchForm;
