const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fileRoutes = require("./routes/files");
const shortenerRoutes = require("./routes/shortener");
const cleanExpiredFiles = require("./services/cleanupService");
const checkOrigin = require("./middlewares/originCheck");
const contactRoutes = require('./routes/contactRoutes');
const path = require('path');
const WebSocket = require("ws");
const wsUploadHandler = require("./websocket/wsUploadHandler");
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

const app = express();
const server = http.createServer(app);
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim());
app.set('trust proxy', true);
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy: Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Fix upload size issue
app.use(express.json({ limit: '20gb' }));
app.use(express.urlencoded({ extended: true, limit: '20gb' }));
app.use(checkOrigin);
app.use("/uploads", express.static("uploads"));
app.use("/api/files", fileRoutes);
app.use("/", shortenerRoutes);
app.use('/api', contactRoutes);
const wss = new WebSocket.Server({ server, path: "/websocket/upload" });
wss.on("connection", wsUploadHandler);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Route to render welcome.ejs
app.get('/', (req, res) => {
  res.render('welcome');
});

const PORT = process.env.PORT || 10000;

server.listen(PORT, '0.0.0.0',() => {
  console.log(`🚀 HTTP + WS server listening on port ${PORT}`);
  setInterval(cleanExpiredFiles, 60 * 60 * 1000); // run every hour
});

server.timeout = 0;