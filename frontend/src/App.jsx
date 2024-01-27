import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { AddContext } from "./pages/AddContext/AddContext";
import axios from "axios";

import Registration from "./pages/Registration/Registration";
import Authorization from "./pages/Authorization/Authorization";
import Profile from "./pages/Profile/Profile";
import Layout from "./components/Layout/Layout";

function App() {
  const navigate = useNavigate();
  // Достаем токен пользовотеля
  const token = JSON.parse(localStorage.getItem("token"));

  // Ответвление
  useEffect(() => {
    if (!!token) {
      return navigate("/");
    } else {
      return navigate("/register");
    }
  }, []);

  // Состояния - для данных пользователя
  const [userData, setUserData] = useState({});

  // Состояния - для загрузки
  const [isLoading, setIsLoading] = useState(true);

  // Отправляет get запрос для получения пользователя
  const BASE_URL = "http://localhost:8080";

  const getUser = async () => {
    try {
      setIsLoading(false);
      const { data } = await axios.get(BASE_URL + "/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Сохраняем данные пользователя
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(true);
  };

  const location = useLocation();

  // Отправляет get запрос при каждом изменении location
  useEffect(() => {
    getUser();
  }, [location.pathname === "/"]);

  // Скрытие пароля
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
          <Route path="/" element={<Profile />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="*" element={<h1 className="error_page">ERROR 404</h1>} />
        </Routes>
      </Layout>
    </AddContext.Provider>
  );
}

export default App;
