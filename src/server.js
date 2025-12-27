const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// 1. Завантажуємо змінні з .env
dotenv.config();

// 2. Підключаємося до БД
connectDB();

const app = express();

// 3. Middlewares
app.use(cors()); // Дозволяє запити з вашого Next.js сайту
app.use(express.json()); // Дозволяє серверу читати JSON у тілі запиту

// 4. Роути
app.use("/api/awards", require("./routes/awards"));

// 5. Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на порту ${PORT} у режимі розробки`);
});
