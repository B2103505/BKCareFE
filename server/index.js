const express = require("express");
const path = require("path");

const mysql = require("mysql2");
const cors = require("cors");

const app = express();

const buildDir = path.join(__dirname, "../build");
console.log("Using files in " + buildDir);

const subDir = "/";
const logRequests = false;

// Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "mydatabase",
});

if (subDir === "/") {
  console.log(
    "The server config assuming it is serving at the server root. You can control this with the `subDir` variable in index.js."
  );
} else {
  console.log("The server config assuming it is serving at '" + subDir + "'.");
}

if (logRequests) {
  console.log("The server will log all incoming request. It's not recommended for production use.");
}

// Serve the static files from the React app
app.use(subDir, express.static(buildDir));

app.use(express.json()); // Cho phép nhận JSON từ frontend

// Cấu hình CORS cho phép mọi domain truy cập
app.use(
  cors({
    origin: "http://localhost:3000", // Cho phép frontend React
    methods: ["GET", "POST"], // Chỉ định các phương thức được phép
    allowedHeaders: ["Content-Type"], // Cho phép các headers cụ thể
  })
);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  if (logRequests) {
    console.log(req.method + " " + req.url);
  }
  res.sendFile(path.join(buildDir, "index.html"));
});

// API lưu thông tin đăng ký lịch hẹn
app.post("/appointments", (req, res) => {
  console.log("📥 Dữ liệu nhận từ frontend:", req.body); // Kiểm tra dữ liệu nhận được

  const { doctor, time, patient, disease } = req.body;
  const { name, phone, birthday, cccd, address, gender } = patient;

  const sql =
    "INSERT INTO appointments (doctor_name, time, patient_name, phone, birthday, cccd, address, gender, disease) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [doctor, time, name, phone, birthday, cccd, address, gender, disease], (err, results) => {
    if (err) {
      console.error("❌ Lỗi khi lưu lịch hẹn:", err);
      return res.status(500).json({ error: "Lỗi lưu lịch hẹn!" });
    }
    res.json({ success: true, message: "🎉 Đăng ký lịch hẹn thành công!" });
  });
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log("React.JS App is running on the port " + port);
