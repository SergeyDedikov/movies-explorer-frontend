import "./Profile.css";

function Profile() {
  // инфо о пользователе (временное)
  const user = {
    name: "Виталий",
    email: "pochta@yandex.ru",
  };

  return (
    <section className="profile" aria-label="Профиль">
      <h1 className="profile__greeting">{`Привет, ${user.name}!`}</h1>
      <div className="profile__info-container">
        <div className="profile__info-row">
          <p className="profile__label">Имя</p>
          <p className="profile__data">{user.name}</p>
        </div>
        <div className="profile__info-row">
          <p className="profile__label">E-mail</p>
          <p className="profile__data">{user.email}</p>
        </div>
      </div>
      <button className="profile__button profile__button_edit button">
        Редактировать
      </button>
      <button className="profile__button profile__button_exit button">
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
