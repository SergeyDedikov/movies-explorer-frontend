import "./ResultBox.css";

export default function ResultBox({ isResult, isError }) {
  if (isError) {
    return (
      <p>
        Во&nbsp;время запроса произошла ошибка. Возможно, проблема
        с&nbsp;соединением или сервер недоступен. Подождите немного
        и&nbsp;попробуйте ещё раз
      </p>
    );
  }
  if (!isResult) {
    return <p>Ничего не найдено</p>;
  } else {
    return null;
  }
}
