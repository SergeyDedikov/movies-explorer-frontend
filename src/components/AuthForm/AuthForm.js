import "./AuthForm.css";

export default function AuthForm(props) {
  return (
    <form
      onSubmit={props.onSubmit}
      name={props.name}
      className={`form form_${props.name}`}
    >
      <fieldset className="form__input-container">{props.children}</fieldset>
      <button
        className={`form__button form__button_${props.name} button`}
        type="submit"
      >
        {props.textButtonSubmit}
      </button>
    </form>
  );
}
