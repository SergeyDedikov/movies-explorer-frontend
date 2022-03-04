import "./App.css";
import Promo from "../Promo/Promo.js";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";

function App() {
  return (
    <main>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
    </main>
  );
}

export default App;
