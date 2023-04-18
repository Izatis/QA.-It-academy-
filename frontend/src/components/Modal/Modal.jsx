import React, { useContext, useState } from "react";
import s from "./Modal.module.scss";
import { AddContext } from "../../pages/AddContext/AddContext";
import classNames from "classnames";
import axios from "axios";

import MyInput from "../MUI/MyInput/MyInput";
import MyButton from "../MUI/Buttons/MyButton/MyButton";
import Loading from "../Loading/Loading";

const Modal = ({ showModal, handleClick }) => {
  // Данные пользователя для редактирования
  const [changeUser, setChangeUser] = useState({
    username: "",
    email: "",
    about: "",
    avatar: "",
  });

  // Здесь я достаю состояние загрузку, (общий)
  const { isLoading, setIsLoading } = useContext(AddContext);

  // Состояние - сообщения ошибки для email инпута, и для сообщения ошибки от сервера
  const [errorMessage, setErrorMessage] = useState("");

  // Отправляем get запрос, и изменяеи данные пользователя
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка для email инпута
    const regex = /^[A-Za-z0-9._%+-]+@(gmail\.com|mail\.ru)$/i;
    const isValidEmail = regex.test(changeUser.email);
    if (!isValidEmail) {
      setErrorMessage("Разрешены только адреса Gmail или Mail.ru");
    } else {
      setIsLoading(false);
      setErrorMessage("");
      try {
        // Достаем токен пользовотеля
        const token = JSON.parse(localStorage.getItem("token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios
          .patch("http://localhost:8080/profile/", changeUser, config)
          .then((response) => console.log(response));
        window.location.reload();

        setUserLogin({
          email: "",
          password: "",
        });
      } catch (error) {
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      }
      setIsLoading(true);
    }
  };

  return (
    <div
      className={showModal ? classNames(s.modal, s.show) : classNames(s.modal)}
      onClick={handleClick}
    >
      <div className={s.modal__content} onClick={(e) => e.stopPropagation()}>
        <h1>Редактировать профиль</h1>

        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.form__body}>
            {isLoading ? (
              <>
                <label htmlFor="text">
                  Имя
                  <MyInput
                    value={changeUser.username}
                    onChange={(e) => {
                      setChangeUser({
                        ...changeUser,
                        username: e.target.value,
                      });
                    }}
                    type="text"
                  />
                </label>

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

                {/* Здесь проверяется присутствие сообщения ошибки в email*/}
                {errorMessage && (
                  <div className={s.error}>
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
                    type="text"
                  />
                </label>

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
              </>
            ) : (
              <div className={s.loading}>
                <Loading />
              </div>
            )}
          </div>
          <div className={s.btns}>
            <MyButton
              onClick={handleClick}
              style={{ color: "#000000", border: "1px solid #D5D5D5" }}
            >
              Отмена
            </MyButton>
            <MyButton
              type="submit"
              style={{
                height: 50,
                background: "#000000",
                color: "#FFFFFF",
              }}
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
