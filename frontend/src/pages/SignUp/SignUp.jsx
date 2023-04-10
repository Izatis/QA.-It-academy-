import React, { useContext, useState } from "react";
import s from "./SignUp.module.scss";
import user from "../../assets/user.png";
import email from "../../assets/email.png";
import password from "../../assets/password.png";
import eye from "../../assets/eye.png";
import { useNavigate } from "react-router-dom";
import { AddContext } from "../AddContext/AddContext";
import axios from "axios";

import MyInput from "../../components/MUI/MyInput/MyInput";
import MyButton from "../../components/MUI/Buttons/MyButton/MyButton";
import Loading from "../../components/Loading/Loading";

const SignUp = () => {
  // Данные пользователя для регистрации
  const [userRegister, setUserRegister] = useState({
    username: "test",
    email: "test@gmail.com",
    password: "123456",
  });

  // Здесь я достаю состояние загрузку, (общий)
  const { isLoading, setIsLoading } = useContext(AddContext);

  const navigate = useNavigate();

  // Состояние - для проверки присутствие поли в инпутах
  const [error, setError] = useState(false);

  // Состояние - сообщения ошибки для email инпута, и для сообщения ошибки от сервера
  const [errorMessage, setErrorMessage] = useState("");

  // Отправляем post запрос,  и за одно проверяется, потом  создает пользователя и перенапраляется на профиль
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userRegister.username.length === 0 ||
      userRegister.email.length === 0 ||
      userRegister.password.length === 0
    ) {
      setError(true);
    } else {
      // Проверка для email инпута
      const regex = /^[A-Za-z0-9._%+-]+@(gmail\.com|mail\.ru)$/i;
      const isValidEmail = regex.test(userRegister.email);
      if (!isValidEmail) {
        setErrorMessage("Разрешены только адреса Gmail или Mail.ru");
      } else {
        setIsLoading(false);
        try {
          await axios
            .post("http://localhost:8080/register", userRegister)
            .then((response) =>
              localStorage.setItem("token", JSON.stringify(response.data.token))
            );

          // Достаем токен пользовотеля
          const token = JSON.parse(localStorage.getItem("token"));

          if (!!token) {
            navigate("/");
          }

          setUserRegister({
            username: "",
            email: "",
            password: "",
            avatar: "",
            about: "",
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
    <div className={s.sign_up_main}>
      {isLoading ? (
        <>
          <h1>Регистрация</h1>
          <form onSubmit={handleSubmit} className={s.inputs_btn}>
            <MyInput
              type="text"
              placeholder="Имя"
              minLength={4}
              value={userRegister.username}
              onChange={(e) => {
                setUserRegister({ ...userRegister, username: e.target.value });
              }}
            >
              <span className={s.input_icon}>
                <img src={user} alt={"user"} />
              </span>
            </MyInput>

            {/* Здесь проверяется присутствие поли в инпуте */}
            {error && userRegister.username.length <= 0 ? (
              <div className={s.error_message}>
                <p>Введите имю!</p>
              </div>
            ) : (
              ""
            )}

            <MyInput
              placeholder="E-mail"
              type="email"
              value={userRegister.email}
              onChange={(e) => {
                setUserRegister({ ...userRegister, email: e.target.value });
              }}
            >
              <span className={s.input_icon}>
                <img src={email} alt={"email"} />
              </span>
            </MyInput>

            {/* Здесь проверяется присутствие поли в инпуте */}
            {error && userRegister.email.length <= 0 ? (
              <div className={s.error_message}>
                <p>Введите e-mail!</p>
              </div>
            ) : (
              ""
            )}

            {/* Здесь проверяется присутствие сообщения ошибки в email*/}
            {errorMessage && (
              <div className={s.error_message}>
                <p>{errorMessage}</p>
              </div>
            )}

            <MyInput
              placeholder="Пароль"
              type={type}
              minLength={4}
              value={userRegister.password}
              onChange={(e) => {
                setUserRegister({ ...userRegister, password: e.target.value });
              }}
            >
              <span className={s.input_icon}>
                <img src={password} alt={"password"} />
              </span>
              <span className={s.hide_password} onClick={passwordHide}>
                <img src={eye} alt="eye" />
              </span>
            </MyInput>

            {/* Здесь проверяется присутствие поли в инпуте */}
            {error && userRegister.password.length <= 0 ? (
              <div className={s.error_message}>
                <p>Введите пароль!</p>
              </div>
            ) : (
              ""
            )}

            {/* Это сравнение проверяет на содержания инпутов и изменяет кнопку */}
            {!!userRegister.username.length &&
            !!userRegister.email.length &&
            !!userRegister.password.length ? (
              <MyButton
                type="submit"
                style={{
                  height: 50,
                  background: "#000000",
                  color: "#FFFFFF",
                }}
              >
                Создать аккаунт
              </MyButton>
            ) : (
              <MyButton className={s.not_active} type="submit">
                Создать аккаунт
              </MyButton>
            )}
          </form>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SignUp;
