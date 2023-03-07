import React from "react";
import s from "./Header.module.scss";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../MUI/Buttons/MyButton/MyButton";

const Header = ({ userData }) => {
  const navigate = useNavigate();

  // Достаем токен пользовотеля
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <div className={s.header_container}>
      <header>
        <div className={s.logo_text}>
          {!!token ? (
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
          ) : (
            <img src={logo} alt="logo" />
          )}
          <span>
            Разрабатываем и запускаем <br />
            сложные веб проекты
          </span>
        </div>

        {/* В зависимости от токена изменяем кнопку на имю и на логотип */}
        {!!token ? (
          <div className={s.userName_avatar}>
            <span className={s.userName}>{userData.username}</span>
            <img className={s.avatar} src={userData.avatar} alt="avatar" />
          </div>
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
