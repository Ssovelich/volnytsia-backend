const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// 1. Завантажуємо змінні з .env
dotenv.config();

// 2. Підключаємося до БД
connectDB();

const app = express();

// 3. Налаштування CORS
// Список дозволених доменів (локальний + домен на продакшені)
const allowedOrigins = [
  "http://localhost:3000",
  "https://volnytsia.vercel.app/",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("CORS заблокував запит з origin:", origin);
      callback(new Error("Політика CORS забороняє доступ з цього домену"));
    }
  },
  credentials: true, // Дозволяє передачу кукі (admin_token)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 4. Middlewares
app.use(express.json()); // Читання JSON
app.use(express.urlencoded({ extended: true })); // Читання даних форм

// 5. Роути
app.use("/api/awards", require("./routes/awards"));

// 6. Обробка помилок (Error Handling)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "На сервері сталася помилка",
    error: process.env.NODE_ENV === "development" ? err.message : {}
  });
});

// 7. Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на порту ${PORT}`);
  console.log(`🌍 Режим: ${process.env.NODE_ENV || "development"}`);
});