import './InfoTooltip.css';

function InfoTooltip(props) {
  // переменная для `className` содержимого попапа
  const popupBackgroundClassName = `popup__container-background ${
    props.isOk ? "popup__container-background_succes" : "popup__container-background_fail"
  }`;

  return (
    <div
      className={`
        popup
        ${props.isOpen ? "popup_opened" : ""}
      `}
    >
      <div className={`popup__container ${popupBackgroundClassName}`}>
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
