import "./AuthForm.css";

export default function AuthForm({ name, children }) {
  return (
    <form id={name} name={name} className={`form form_${name}`} noValidate>
      <fieldset className="form__input-container">{children}</fieldset>
    </form>
  );
}
