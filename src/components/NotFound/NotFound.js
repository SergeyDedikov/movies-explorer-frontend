import { useNavigate } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  function gotoBack() {
    navigate(-1);
  }

  return (
    <section className="not-found" aria-label="Страница не найдена">
      <p className="not-found__title">404</p>
      <p className="not-found__text">Страница не найдена</p>
      <button onClick={gotoBack} className="not-found__button button">
        Назад
      </button>
    </section>
  );
}
