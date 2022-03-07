import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <div className="form-container">
      <form id="search-movies" className="search-movies" name="search-movies">
        <input
          className="search-movies__input"
          type="text"
          name="movie"
          placeholder="Фильм"
        ></input>
        <button className="search-form__button" type="submit">
          Поиск
        </button>
        <FilterCheckbox />
      </form>
    </div>
  );
}

export default SearchForm;
