// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");

// const documentRoutes = require("./routes/documentRoutes");
// const authRoutes = require("./routes/auth");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use("/api/documents", documentRoutes);

// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });

// // Socket.io logic
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("join-document", (docId) => {
//     socket.join(docId);
//     console.log(`User ${socket.id} joined doc ${docId}`);
//   });

//   socket.on("send-changes", ({ docId, delta }) => {
//     socket.to(docId).emit("receive-changes", delta);
//   });

//   socket.on("cursor-move", ({ docId, cursor, color }) => {
//     socket.to(docId).emit("update-cursor", { id: socket.id, cursor, color });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//     server.listen(PORT, () =>
//       console.log(`Server running on http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => console.error("❌ MongoDB Error:", err));

require("dotenv").config();
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const documentRoutes = require("./routes/documentRoutes");
const authRoutes = require("./routes/auth");

// dotenv.config();
require("dotenv").config();
console.log("Loaded ENV:", process.env.AWS_BUCKET_NAME, process.env.AWS_REGION);

const app = express();
const PORT = process.env.PORT || 5000;

console.log("Bucket:", process.env.AWS_BUCKET_NAME);
console.log("Region:", process.env.AWS_REGION);
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

// =======================
// 🔹 AWS S3 Configuration
// =======================
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer-S3 storage setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read", // file public access (can adjust)
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

// 🔹 Upload Route (Frontend se file bhejne ke liye)
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "File not uploaded" });
  res.json({ fileUrl: req.file.location }); // return S3 file URL
});

// =======================
// 🔹 Socket.io Logic
// =======================
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-document", (docId) => {
    socket.join(docId);
    console.log(`User ${socket.id} joined doc ${docId}`);
  });

  socket.on("send-changes", ({ docId, delta }) => {
    socket.to(docId).emit("receive-changes", delta);
  });

  socket.on("cursor-move", ({ docId, cursor, color }) => {
    socket.to(docId).emit("update-cursor", { id: socket.id, cursor, color });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// =======================
// 🔹 MongoDB Connection
// =======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    server.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
