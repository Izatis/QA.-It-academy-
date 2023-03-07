import React, { useContext, useEffect, useState } from "react";
import s from "./Profile.module.scss";
import cover from "../../assets/cover.png";
import Header from "../../components/Header/Header";
import MyButton from "../../components/MUI/Buttons/MyButton/MyButton";
import edit from "../../assets/edit.png";
import exit from "../../assets/exit.png";
import Modal from "../../components/Modal/Modal";
import axios from "axios";
import { AddContext } from "../AddContext/AddContext";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Это состояние модалки
  const [active, setActive] = useState(false);

  // Данные пользователя
  const [userData, setUserData] = useState({});

  // Здесь я достаю состояние загрузки, с помощи хука useContext()
  const { isLoading, setIsLoading } = useContext(AddContext);

  // Достаем токен пользователя
  const token = JSON.parse(localStorage.getItem("token"));

  // Отправляет get запрос
  const getUser = async () => {
    try {
      setIsLoading(false);
      await axios
        .get("http://localhost:8080/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUserData(res.data.data));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  const navigate = useNavigate();

  // Выйти из аккаунта
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/register");
  };

  return (
    <div className={s.profile_main}>
      <Header userData={userData} />
      <div className={s.profile_body}>
        <img className={s.cover_first} src={cover} alt="cover" />
        <div className={s.cover_second}></div>
        {isLoading ? (
          <div className={s.profile_content}>
            <span className={s.avatar}>
              <img src={userData.avatar} alt="avatar" />
            </span>
            <div className={s.container}>
              <div className={s.name_email}>
                <h1>{userData.username}</h1>
                <p>{userData.email}</p>
              </div>
              <MyButton
                onClick={() => setActive(true)}
                style={{
                  maxWidth: 200,
                  color: "#000000",
                  border: "1px solid #D5D5D5",
                }}
              >
                <span className={s.edit_img}>
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
              <span className={s.exit_img}>
                <img src={exit} alt="exit" />
              </span>
              Выйти
            </MyButton>
          </div>
        ) : (
          <div className={s.center_loading}>
            <Loading />
          </div>
        )}
        <Modal
          active={active}
          setActive={setActive}
          userData={userData}
          setUserData={setUserData}
        />
      </div>
    </div>
  );
};

export default Profile;
