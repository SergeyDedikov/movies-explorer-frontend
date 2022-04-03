import "./ResultBox.css";

export default function ResultBox({ isSearchResult, isSearchError }) {
  if (isSearchError) {
    return (
      <div className="resultbox">
        <p className="resultbox__message">
          Во&nbsp;время запроса произошла ошибка. Возможно, проблема
          с&nbsp;соединением или сервер недоступен. Подождите немного
          и&nbsp;попробуйте ещё раз
        </p>
      </div>
    );
  }
  if (!isSearchResult) {
    return (
      <div className="resultbox">
        <p className="resultbox__message">Ничего не найдено</p>
      </div>
    );
  } else {
    return null;
  }
}
