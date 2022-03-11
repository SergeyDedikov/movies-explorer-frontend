import "./PageWithAuthForm.css";
import Logo from "../Logo/Logo";

function PageWithAuthForm(props) {
  return (
    <section className="authentication">
      <div className="authentication__header">
        <Logo place="authentication" />
        <h2 className="authentication__heading">{props.heading}</h2>
      </div>
      {props.children}
    </section>
  );
}

export default PageWithAuthForm;
