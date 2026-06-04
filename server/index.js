import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./db/index.js";
import cookieParser from "cookie-parser";

const app = express();

import bcrypt from "bcrypt";

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Routes
import signupRoute from "./routes/signup.routes.js";
import loginRoute from "./routes/login.routes.js";

app.use("/api", signupRoute);
app.use("/api", loginRoute);

(async () => {
  try {
    await db.connect();

    console.log("Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("Database Connection Error:", error);
  }
})();