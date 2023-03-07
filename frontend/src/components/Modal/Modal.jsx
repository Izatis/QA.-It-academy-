import React from "react";
import s from "./Modal.module.scss";
import classNames from "classnames";
import MyInput from "../MUI/MyInput/MyInput";
import MyButton from "../MUI/Buttons/MyButton/MyButton";

const Modal = ({ active, setActive, userData, setUserData }) => {
  // get запрос нету Ментор сказал не делать, кнопка "Сохранить" не рабочая!
  return (
    <div
      className={active ? classNames(s.modal, s.active) : classNames(s.modal)}
    >
      <div className={s.modal_content}>
        <h1>Редактировать профиль</h1>
        <form>
          <label htmlFor="text">
            Имя
            <MyInput
              value={userData.username}
              onChange={(e) => {
                setUserData({ ...userData, username: e.target.value });
              }}
              type="text"
            />
          </label>
          <label htmlFor="email">
            E-mail
            <MyInput
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
              type="email"
            />
          </label>
          <label htmlFor="url">
            Url аватарки
            <MyInput
              value={userData.avatar}
              onChange={(e) => {
                setUserData({ ...userData, avatar: e.target.value });
              }}
              type="email"
            />
          </label>
          <label htmlFor="">
            Описание <br />
            <textarea
              cols="65"
              rows="5"
              value={userData.about}
              onChange={(e) => {
                setUserData({ ...userData, about: e.target.value });
              }}
            />
          </label>
          <div className={s.buttons}>
            <MyButton
              onClick={() => setActive(false)}
              style={{ color: "#000000", border: "1px solid #D5D5D5" }}
            >
              Отмена
            </MyButton>
            <MyButton
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
