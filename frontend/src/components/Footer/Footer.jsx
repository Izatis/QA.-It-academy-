import React from "react";
import "./Footer.module.scss";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  // Достаем текущий адрес
  const location = useLocation();

  return (
    <footer>
      {/* Сравниваем если пользовотель находится /login здесь  */}
      {location.pathname === "/login" ? (
        <>
          <Link to={"/register"}>
            {/* то показываем вот это */}
            <p>Еще нет аккаунта? </p>Зарегистрироваться
          </Link>
        </>
      ) : (
        <>
          <Link to={"/login"}>
            {/* в противном случае вот это */}
            <p>Уже есть аккаунт? </p>Войти
          </Link>
        </>
      )}
    </footer>
  );
};

export default Footer;
