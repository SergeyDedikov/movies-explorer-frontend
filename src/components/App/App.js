import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";

function App() {
  return (
    <>
      <Header />
      {/* <Profile /> */}
      <Register />
      {/* <Movies />
      <SavedMovies />
      <Main /> */}
      <Footer />
    </>
  );
}

export default App;
