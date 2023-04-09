import React from "react";
import s from "./Layout.module.scss";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  // Достаем токен пользователя
  const token = JSON.parse(localStorage.getItem("token"));

  const location = useLocation();
  return (
    <>
      <Header />
      {children}
      {location.pathname === "/" || location.pathname === "*" ? null : (
        <Footer />
      )}
    </>
  );
};

export default Layout;
