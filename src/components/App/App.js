import "./App.css";
import Promo from "../Promo/Promo.js";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";

function App() {
  return (
    <main>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
}

export default App;
