import "./AddMoreMovies.css";

export default function AddMoreMovies({ isMoreMovies }) {
  const showButtonClassName = `add-more-movies__button ${
    isMoreMovies && "add-more-movies__button_visible"
  }`;

  return (
    <div className="add-more-movies">
      <button className={`${showButtonClassName} button`}>Ещё</button>
    </div>
  );
}
