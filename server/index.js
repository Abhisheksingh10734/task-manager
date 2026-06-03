import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

dotenv.config({path: "../.env"});
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));

// built-in parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(express.json());

app.post("/api/user", (req, res) => {
    res.json({
        message: "User created"
    });
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
  
})