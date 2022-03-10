import "./PageWithAuthForm.css";

function PageWithAuthForm(props) {
  return (
    <section className="authentication">
      <h1 className={`form__heading`}>{props.heading}</h1>
      {props.children}
    </section>
  );
}

export default PageWithAuthForm;
