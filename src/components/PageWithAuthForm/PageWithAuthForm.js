import "./PageWithAuthForm.css";

function PageWithAuthForm(props) {
  return (
    <section className="authentication">
      <div className="authentication__header">
        <div className="authentication__logo"></div>
        <h2 className="authentication__heading">{props.heading}</h2>
      </div>
      {props.children}
    </section>
  );
}

export default PageWithAuthForm;
