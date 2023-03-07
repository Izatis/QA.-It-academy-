import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";
import { AddContext } from "./pages/AddContext/AddContext";
import { useEffect, useState } from "react";

function App() {
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

  // Это состояние проверки пользователя
  const [checkUser, setCheckUser] = useState(false);

  const navigate = useNavigate();

  // Проверка пользователя
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!!token) {
      setCheckUser(false);
      return navigate("/");
    } else {
      setCheckUser(true);
      return navigate("/register");
    }
  }, [checkUser]);

  return (
    <AddContext.Provider
      value={{
        isLoading,
        setIsLoading,
        type,
        passwordHide,
      }}
    >
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<Profile />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Routes>
    </AddContext.Provider>
  );
}

export default App;
