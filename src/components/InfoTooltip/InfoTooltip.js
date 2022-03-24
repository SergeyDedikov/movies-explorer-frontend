import "./InfoTooltip.css";

function InfoTooltip(props) {
  // переменная для `className` содержимого попапа
  const popupIconMessageClassName = `popup__icon-message ${
    props.isOk ? "popup__icon-message_succes" : "popup__icon-message_fail"
  }`;

  return (
    <div
      className={`
        popup
        ${props.isOpen ? "popup_opened" : ""}
      `}
    >
      <div className="popup__container">
        <div className={popupIconMessageClassName}></div>
        <p className="popup__message">{props.message}</p>
        <button
          onClick={props.onClose}
          className="popup__close button"
          type="button"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
