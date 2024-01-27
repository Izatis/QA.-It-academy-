import React, { useContext, useState } from "react";
import s from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import { AddContext } from "../AddContext/AddContext";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";

import cover from "../../assets/cover.png";
import edit from "../../assets/edit.png";
import exit from "../../assets/exit.png";
import MyButton from "../../components/MUI/Buttons/MyButton/MyButton";
import Modal from "../../components/Modal/Modal";
import Loading from "../../components/Loading/Loading";

const Profile = () => {
  // Данные пользователя
  const { userData, setUserData } = useContext(AddContext);

  // Состояние - для  загрузки, (общий)
  const { isLoading } = useContext(AddContext);

  const navigate = useNavigate();

  // Выйти из аккаунта
  const signOut = () => {
    navigate("/register");
    localStorage.removeItem("token");
    setUserData({});
  };

  // ------------------------------------------------------

  // Состояние - для модалки
  const [activeModal, setActiveModal] = useState(false);

  // Состояние - для запрета прокрутки когда модалка открыто
  const [isLocked, setIsLocked] = useBodyScrollLock();

  // Function - для activeModal и isLocked
  const handleClick = () => {
    setActiveModal(!activeModal);
    setIsLocked(!isLocked);
  };

  return (
    <div className={s.profile}>
        <img className={s.coverFirst} src={cover} alt="cover" />
        <div className={s.coverSecond}></div>
        {isLoading ? (
          <div className={s.profile__content}>
            <span className={s.avatar}>
              <img src={userData.avatar} alt="avatar" />
            </span>
            <div className={s.container}>
              <div className={s.name}>
                <h1>{userData.username}</h1>
                <p>{userData.email}</p>
              </div>
              <MyButton
                onClick={handleClick}
                style={{
                  maxWidth: 200,
                  color: "#000000",
                  border: "1px solid #D5D5D5",
                }}
              >
                <span className={s.edit}>
                  <img src={edit} alt="edit" />
                </span>
                Редактировать
              </MyButton>
            </div>
            <div className={s.text}>
              <p>
                {userData.about}
                {/* Просто по умолчанию поставил */}
                Рыбатекст используется дизайнерами, проектировщиками и
                фронтендерами, когда нужно быстро заполнить макеты или прототипы
                содержимым. Это тестовый контент, который не должен нести
                никакого смысла, лишь показать наличие самого текста или
                продемонстрировать типографику в деле.
              </p>
            </div>
            <MyButton
              onClick={signOut}
              style={{
                maxWidth: 130,
                color: "#000000",
                border: "1px solid #D5D5D5",
                marginTop: 60,
              }}
            >
              <span className={s.logOut}>
                <img src={exit} alt="exit" />
              </span>
              Выйти
            </MyButton>
          </div>
        ) : (
          <div className={s.loading}>
            <Loading />
          </div>
        )}
        <Modal
          activeModal={activeModal}
          handleClick={handleClick}
          userData={userData}
        />
      </div>
  );
};

export default Profile;