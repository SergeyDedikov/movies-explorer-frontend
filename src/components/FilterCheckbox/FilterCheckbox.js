import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <label className="checkbox__label" htmlFor="filter-movies">
      <input
        name="filter-movies"
        type="checkbox"
        className="checkbox__input-invisible"
        id="filter-movies"
        defaultChecked={true}
      />
      <span className="checkbox__input-track">
        <span className="checkbox__input-item"></span>
      </span>
      Короткометражки
    </label>
  );
}

export default FilterCheckbox;
