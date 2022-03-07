import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <label className="checkbox__label" for="filter-movies">
      <input
        name="filter-movies"
        type="checkbox"
        className="checkbox__input-invisible"
        id="filter-movies"
        checked="true"
      />
      <span className="checkbox__input-track">
        <span className="checkbox__input-item"></span>
      </span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
