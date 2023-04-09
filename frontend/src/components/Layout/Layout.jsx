import React from "react";
import s from "./Layout.module.scss";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  // Достаем токен пользователя
  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <>
      <Header />
      {children}
      {!!token ? null : (
        <Footer />
      )}
    </>
  );
};

export default Layout;
