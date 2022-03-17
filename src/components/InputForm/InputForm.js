import "./InputForm.css";

export default function InputForm(props) {
  return (
    <label className="form__input-label">
      {props.label}
      <input
        value={props.value}
        onChange={props.onChange}
        id={`${props.name}-${props.nameform}`}
        className={`form__input ${
          props.isError ? "form__input_type_error" : ""
        }`}
        type={props.type}
        name={props.name}
        required
      />
      <span id={`${props.name}-error`} className="form__error">
        {props.message}
      </span>
    </label>
  );
}
