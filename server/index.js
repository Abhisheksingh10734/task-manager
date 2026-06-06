import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./db/index.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  process.env.CLIENT_URL,
];

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true,
// };

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Routes
import signupRoute from "./routes/signup.routes.js";
import loginRoute from "./routes/login.routes.js";
import dashboardRoute from "./routes/dashboard.routes.js";
import createTaskRoute from "./routes/createTask.routes.js";
import getTasks from "./routes/getTasks.routes.js";
import editTask from "./routes/editTask.routes.js";
import updateTask from "./routes/updateTask.routes.js";
import getTaskStats from "./routes/getTaskStats.routes.js";
import deleteTask from "./routes/deleteTask.routes.js";
import updateComplete from "./routes/updateComplete.routes.js";

app.use("/api", signupRoute);
app.use("/api", loginRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/app", createTaskRoute);
app.use("/app", getTasks);
app.use("/app/tasks", editTask);
app.use("/app/tasks", updateTask);
app.use("/app", getTaskStats);
app.use("/app/tasks", deleteTask);
app.use("/app/tasks", updateComplete);

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