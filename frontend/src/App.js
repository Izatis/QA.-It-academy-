import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { AddContext } from "./pages/AddContext/AddContext";
import axios from "axios";

import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";

function App() {
  // Данные пользователя
  const [userData, setUserData] = useState({});
  
  // Это состояние загрузки
  const [isLoading, setIsLoading] = useState(true);
  
  // Достаем токен пользовотеля
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
  
  const location = useLocation()

  // Отправляет get запрос при каждом изменении localStorage
  useEffect(() => {
    getUser();
  }, [location.pathname === '/']);

  //  Скрытие пароля
  const [type, setType] = useState("password");
  const passwordHide = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <AddContext.Provider
      value={{
        userData,
        setUserData,
        isLoading,
        setIsLoading,
        getUser,
        type,
        passwordHide,
      }}
    >
      <Layout>
        <Routes>
          {!!token ? (
            <Route path="/" element={<Profile />} />
          ) : (
            <>
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
            </>
          )}
          <Route path="*" element={<h1 className="error_page">ERROR 404</h1>} />
        </Routes>
      </Layout>
    </AddContext.Provider>
  );
}

export default App;
