import React, { useContext, useState } from "react";
import s from "./Modal.module.scss";
import classNames from "classnames";

import MyInput from "../MUI/MyInput/MyInput";
import MyButton from "../MUI/Buttons/MyButton/MyButton";
import { AddContext } from "../../pages/AddContext/AddContext";

const Modal = ({ active, setActive }) => {
  // Данные пользователя для редактирования
  const [changeUser, setChangeUser] = useState({
    username: "test",
    email: "test@gmail.com",
    password: "123456",
    avatar: "https://picsum.photos/id/1/200/200",
    about:
      "Я тестовый пользователь номер один. Я никогда не пропадаю между запусками api!",
  });

  // Здесь я достаю состояние загрузку, (общий)
  const { isLoading, setIsLoading } = useContext(AddContext);

  // Состояние - для проверки присутствие поли в инпутах
  const [error, setError] = useState(false);

  // Состояние - сообщения ошибки для email инпута, и для сообщения ошибки от сервера
  const [errorMessage, setErrorMessage] = useState("");

  // Отправляем get запрос, и изменяеи данные пользователя
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userLogin.email.length === 0 || userLogin.password.length === 0) {
      setError(true);
    } else {
      // Проверка для email инпута
      const regex = /^[A-Za-z0-9._%+-]+@(gmail\.com|mail\.ru)$/i;
      const isValidEmail = regex.test(userLogin.email);
      if (!isValidEmail) {
        setErrorMessage("Разрешены только адреса Gmail или Mail.ru");
      } else {
        setIsLoading(false);
        try {
          await axios
            .patch("http://localhost:8080/profile", userLogin)
            .then((response) =>
              localStorage.setItem("token", JSON.stringify(response.data.token))
            );

          // Достаем токен пользовотеля
          const token = JSON.parse(localStorage.getItem("token"));

          if (!!token) {
            navigate("/");
          }

          setUserLogin({
            email: "",
            password: "",
          });
        } catch (error) {
          setErrorMessage(error.response.data.error);
        }
        setIsLoading(true);
      }
    }
  };

  return (
    <div
      className={active ? classNames(s.modal, s.active) : classNames(s.modal)}
    >
      <div className={s.modal_content}>
        <h1>Редактировать профиль</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">
            Имя
            <MyInput
              value={changeUser.username}
              onChange={(e) => {
                setChangeUser({ ...changeUser, username: e.target.value });
              }}
              type="text"
            />
          </label>

          {/* Здесь проверяется присутствие поли в инпуте */}
          {error && userLogin.username.length <= 0 ? (
            <div className={s.error_message}>
              <p>Введите пароль!</p>
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email">
            E-mail
            <MyInput
              value={changeUser.email}
              onChange={(e) => {
                setChangeUser({ ...changeUser, email: e.target.value });
              }}
              type="email"
            />
          </label>

          {/* Здесь проверяется присутствие поли в инпуте */}
          {error && userLogin.email.length <= 0 ? (
            <div className={s.error_message}>
              <p>Введите пароль!</p>
            </div>
          ) : (
            ""
          )}

          {/* Здесь проверяется присутствие сообщения ошибки */}
          {errorMessage && (
            <div className={s.error_message}>
              <p>{errorMessage}</p>
            </div>
          )}

          <label htmlFor="avatar">
            Url аватарки
            <MyInput
              value={changeUser.avatar}
              onChange={(e) => {
                setChangeUser({ ...changeUser, avatar: e.target.value });
              }}
              type="email"
            />
          </label>

          {/* Здесь проверяется присутствие поли в инпуте */}
          {error && userLogin.avatar.length <= 0 ? (
            <div className={s.error_message}>
              <p>Введите пароль!</p>
            </div>
          ) : (
            ""
          )}

          <label htmlFor="about">
            Описание <br />
            <textarea
              cols="65"
              rows="5"
              value={changeUser.about}
              onChange={(e) => {
                setChangeUser({ ...changeUser, about: e.target.value });
              }}
            />
          </label>

          {/* Здесь проверяется присутствие поли в инпуте */}
          {error && userLogin.about.length <= 0 ? (
            <div className={s.error_message}>
              <p>Введите пароль!</p>
            </div>
          ) : (
            ""
          )}

          <div className={s.buttons}>
            <MyButton
              onClick={() => setActive(false)}
              style={{ color: "#000000", border: "1px solid #D5D5D5" }}
            >
              Отмена
            </MyButton>
            <MyButton
              type="submit"
              style={{ height: 50, background: "#000000", color: "#FFFFFF" }}
            >
              Сохранить
            </MyButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
