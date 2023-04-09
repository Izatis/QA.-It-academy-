import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";
import { AddContext } from "./pages/AddContext/AddContext";
import { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import axios from "axios";

function App() {
  // Достаем токен пользовотеля
  const token = JSON.parse(localStorage.getItem("token"));

  // Данные пользователя
  const [userData, setUserData] = useState({});

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

  useEffect(() => {
    getUser();
  }, []);

  // Это состояние загрузки
  const [isLoading, setIsLoading] = useState(true);

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
        isLoading,
        setIsLoading,
        type,
        passwordHide,
        getUser,
        userData,
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
          <Route path="*" element={<h1 className="error">ERROR 404</h1>} />
        </Routes>
      </Layout>
    </AddContext.Provider>
  );
}

export default App;
