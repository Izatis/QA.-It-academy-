import React, { useContext, useState } from "react";
import s from "./SignIn.module.scss";
import { useNavigate } from "react-router-dom";
import { AddContext } from "../AddContext/AddContext";
import axios from "axios";

import email from "../../assets/email.png";
import password from "../../assets/password.png";
import eye from "../../assets/eye.png";
import MyInput from "../../components/MUI/MyInput/MyInput";
import MyButton from "../../components/MUI/Buttons/MyButton/MyButton";
import Loading from "../../components/Loading/Loading";

const SignIn = () => {
  // Данные пользователя для авторизации
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // Здесь я достаю состояние загрузку, (общий)
  const { isLoading, setIsLoading } = useContext(AddContext);

  const navigate = useNavigate();

  // Состояние - для проверки присутствие поли в инпутах
  const [error, setError] = useState(false);

  // Состояние - сообщения ошибки для email инпута, и для сообщения ошибки от сервера
  const [errorMessage, setErrorMessage] = useState("");

  // Отправляем post запрос, и за одно проверяется пользователь и перенапраляется на профиль
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userLogin.email.length === 0 || userLogin.password.length === 0) {
      setError(true);
    } else {
      // Проверка для email инпута
      const regex = /^[A-Za-z0-9._%+-]+@(gmail\.com|mail\.ru)$/i;
      const isValidEmail = regex.test(userLogin.email);
      if (!isValidEmail) {
        setErrorMessage("Разрешены только адреса Gmail или Mail.ru");
      } else {
        setIsLoading(false);
        setErrorMessage("");
        try {
          await axios
            .post("http://localhost:8080/login", userLogin)
            .then((response) =>
              localStorage.setItem("token", JSON.stringify(response.data.token))
            );

          // Достаем токен пользовотеля
          const token = JSON.parse(localStorage.getItem("token"));

          if (!!token) {
            navigate("/");
          }

          setUserLogin({
            email: "",
            password: "",
          });
        } catch (error) {
          setErrorMessage(error.response.data.error);
        }
        setIsLoading(true);
      }
    }
  };

  // ------------------------------------------------------

  // Это состояние скрытие пароля, (общий)
  const { type, passwordHide } = useContext(AddContext);

  return (
    <section className={s.signIn}>
      {isLoading ? (
        <>
          <h1>Вход</h1>
          <form onSubmit={handleSubmit} className={s.signIn__form}>
            <MyInput
              value={userLogin.email}
              onChange={(e) =>
                setUserLogin({ ...userLogin, email: e.target.value })
              }
              type="email"
              placeholder="E-mail"
            >
              <span className={s.inputIcon}>
                <img src={email} alt={"email"} />
              </span>
            </MyInput>

            {/* Здесь проверяется присутствие поли в инпуте */}
            {error && userLogin.email.length <= 0 ? (
              <div className={s.error}>
                <p>Введите email!</p>
              </div>
            ) : (
              ""
            )}

            {/* Здесь проверяется присутствие сообщения ошибки в email */}
            {errorMessage && (
              <div className={s.error}>
                <p>{errorMessage}</p>
              </div>
            )}

            <MyInput
              placeholder="Пароль"
              type={type}
              minLength={4}
              value={userLogin.password}
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
            >
              <span className={s.inputIcon}>
                <img src={password} alt={"password"} />
              </span>
              <span className={s.hidePasswordIcon} onClick={passwordHide}>
                <img src={eye} alt="eye" />
              </span>
            </MyInput>

            {/* Здесь проверяется присутствие поли в инпуте */}
            {error && userLogin.password.length <= 0 ? (
              <div className={s.error}>
                <p>Введите пароль!</p>
              </div>
            ) : (
              ""
            )}

            {/* Это сравнение проверяет на содержания инпутов и изменяет кнопку */}
            {!!userLogin.email.length && !!userLogin.password.length ? (
              <MyButton
                type="submit"
                style={{
                  height: 50,
                  background: "#000000",
                  color: "#FFFFFF",
                }}
              >
                Войти
              </MyButton>
            ) : (
              <MyButton className={s.notActiveBtn} type="submit">
                Войти
              </MyButton>
            )}
          </form>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default SignIn;
