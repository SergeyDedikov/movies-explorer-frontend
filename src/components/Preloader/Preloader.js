import "./Preloader.css";

function Preloader({ isLoading }) {
  if (isLoading) {
    return (
      <div className="preloader">
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
    );
  }
  return null;
}

export default Preloader;
