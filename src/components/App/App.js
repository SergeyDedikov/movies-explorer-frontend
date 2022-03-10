import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
  return (
    <>
      <Header />
      <Profile />
      {/* <Movies />
      <SavedMovies />
      <Main /> */}
      <Footer />
    </>
  );
}

export default App;
