import "./AddMoreMovies.css";

export default function AddMoreMovies({
  isMoreMovies,
  onAddMoreMovies,
  numberAddMovies,
}) {
  const showButtonClassName = `add-more-movies__button ${
    isMoreMovies && "add-more-movies__button_visible"
  }`;

  function handleAddMoreMovies() {
    onAddMoreMovies(numberAddMovies);
  }

  return (
    <div className="add-more-movies">
      <button
        onClick={handleAddMoreMovies}
        className={`${showButtonClassName} button`}
      >
        Ещё
      </button>
    </div>
  );
}
