import "./FilterCheckbox.css";

function FilterCheckbox({ onChange, isChecked }) {

  return (
    <label className="checkbox__label" htmlFor="filter-movies">
      <input
        onChange={onChange}
        name="filterMovies"
        type="checkbox"
        className="checkbox__input-invisible"
        id="filter-movies"
        checked={isChecked}
      />
      <span className="checkbox__input-track">
        <span className="checkbox__input-item"></span>
      </span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
