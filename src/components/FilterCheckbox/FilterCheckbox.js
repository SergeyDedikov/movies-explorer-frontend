import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <label className="checkbox-label" for="filter-movies">
      <input
        name="filter-movies"
        type="checkbox"
        className="checkbox-invisible"
        id="filter-movies"
      />
      <span className="checkbox-visible__track">
        <span className="checkbox-visible__item"></span>
      </span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
