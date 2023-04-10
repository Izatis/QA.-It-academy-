import React, { useContext } from "react";
import s from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../MUI/Buttons/MyButton/MyButton";
import { AddContext } from "../../pages/AddContext/AddContext";

import logo from "../../assets/logo.png";

const Header = () => {
  // Данные пользователя, (общий)
  const { userData } = useContext(AddContext);

  const navigate = useNavigate();

  // Достаем токен пользовотеля
  const token = JSON.parse(localStorage.getItem("token"));
  
  return (
    <div className={s.header_container}>
      <header>
        {!!token ? (
          <Link to={"/"} className={s.logo_text}>
            <img src={logo} alt="logo" />
            <span>
              Разрабатываем и запускаем <br />
              сложные веб проекты
            </span>
          </Link>
        ) : (
          <div className={s.logo_text}>
            <img src={logo} alt="logo" />
            <span>
              Разрабатываем и запускаем <br />
              сложные веб проекты
            </span>
          </div>
        )}

        {/* В зависимости от токена изменяем кнопку на имю и на логотип */}
        {!!token ? (
          <Link to={"/"} className={s.name_avatar}>
            <span className={s.name}>{userData.username}</span>
            <img className={s.avatar} src={userData.avatar} alt="avatar" />
          </Link>
        ) : (
          <MyButton
            onClick={() => navigate("/login")}
            style={{
              maxWidth: 114,
              height: 40,
              color: "#000000",
              border: "1px solid #D5D5D5",
            }}
          >
            Войти
          </MyButton>
        )}
      </header>
    </div>
  );
};

export default Header;
