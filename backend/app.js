const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const cors = require("cors");

const ACCESS_TOKEN_SECRET = "topsecretkey";
const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// инициализация middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const delayMiddleware = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 1000);
};

// utils
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// замоканная база данных
// !!! при кажом перезапуске api база массив users будет устанавливаться в это состояние!!
let users = [
  {
    id: 1,
    username: "test",
    email: "test@gmail.com",
    password: "123456",
    avatar: `https://picsum.photos/id/1/200/200`,
    about:
      "Я тестовый пользователь номер один. Я никогда не пропадаю между запусками api!",
  },
  {
    id: 2,
    username: "test2",
    email: "test2@gmail.com",
    avatar: `https://picsum.photos/id/2/200/200`,
    password: "1234567",
    about:
      "Я тестовый пользователь номер два. Я так же никогда не пропадаю между запусками api!",
  },
];

app.post("/login", delayMiddleware, (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email == email && user.password == password
  );

  if (user) {
    // если пользователь найден в массиве users
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "topsecretkey",
      { expiresIn: 129600 }
    );

    res.json({
      error: null,
      token,
    });
  } else {
    res.status(401).json({
      token: null,
      error: "Введите корректные логин и пароль.",
    });
  }
});

app.get("/profile", authMiddleware, delayMiddleware, (req, res) => {
  const { id } = req.user;
  const user = users.find((user) => user.id == id);
  if (user) {
    const { password, ...info } = user;
    res.json({
      data: info,
    });
  } else {
    res.status(400).json({
      error: "Не удалось получить информацию о пользователе",
    });
  }
});

app.post("/register", delayMiddleware, (req, res) => {
  const { username, email, password } = req.body;

  // Валидация
  if (email && !validateEmail(email)) {
    return res
      .status(400)
      .json({ error: "Некорректный адрес электронной почты!" });
  }
  if (username.trim().length < 3) {
    return res.status(400).json({ error: "Слишком короткое имя" });
  }
  if (password.trim().length < 4) {
    return res.status(400).json({ error: "Слишком короткий пароль" });
  }

  // Проверяем, что такого пользователя еще нет в базе
  const isRegistered = users.some((user) => user.email === email);
  if (isRegistered) {
    return res
      .status(400)
      .json({ error: "Пользователь с таким E-mail уже зарегистрирован" });
  }

  // Создаем нового пользователя
  const id = users.length + 1;
  const user = {
    id,
    username: username.trim(),
    email: email.trim(),
    password: password.trim(),
    avatar: `https://picsum.photos/id/${id}/200/200`,
    about: null,
  };
  users.push(user);

  // Генерируем JWT токен
  const token = jwt.sign(
    { id: user.id, username: user.username },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.json({
    message: "Пользователь успешно зарегистрирован",
    token,
  });
});

app.patch("/profile", authMiddleware, delayMiddleware, (req, res) => {
  const { username, email, password, about, avatar } = req.body;
  const { id } = req.user;

  // здесь должна быть проверка валидности полей

  const userIndex = users.findIndex((user) => user.id == id);
  if (userIndex == -1) {
    return res.status(404).json({
      error: "Пользователь не найден",
    });
  }

  const isRegistered = users.some((user) => user.email === email);
  if (isRegistered) {
    return res
      .status(400)
      .json({ error: "Пользователь с таким E-mail уже зарегистрирован" });
  }

  if (username && username.length < 3) {
    res.status(400).json({
      error: "Слишком короткое имя!",
    });
    return;
  }

  if (email && !validateEmail(email)) {
    res.status(400).json({
      error: "Некорректный адрес электронной почты!",
    });
    return;
  }

  if (password && password.length < 4) {
    res.status(400).json({
      error: "Слишком короткий пароль!",
    });
    return;
  }

  const updatedUser = {
    ...users[userIndex],
    username: username || users[userIndex].username,
    email: email || users[userIndex].email,
    about: about !== undefined ? about : users[userIndex].about,
    avatar: avatar || users[userIndex].avatar,
  };

  users[userIndex] = updatedUser;

  res.json({
    message: "Профиль успешно обновлен",
  });
});

// error handling
app.use((error, req, res, next) => {
  if (error.name === "UnauthorizedError") {
    // если пользователь не авторизован - отправляем ошибку о том что он не авторизован
    res.status(401).json({
      message: "Пользователь не авторизован",
    });
  } else {
    next(error);
  }
});

//дефолтный порт приложения
const PORT = 8080;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Сервер с API стартовал по адресу http://localhost:${PORT}`);
});
