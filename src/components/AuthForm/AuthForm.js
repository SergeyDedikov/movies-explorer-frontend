import "./AuthForm.css";

export default function AuthForm(props) {
  return (
    <form
      onSubmit={props.onSubmit}
      name={props.name}
      className={`form form_${props.name}`}
    >
      <fieldset className="form__input-container">{props.children}</fieldset>
      
    </form>
  );
}
