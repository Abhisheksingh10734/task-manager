import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./db/index.js";
import hashPassword from "./utils/hashPass.js"
import hashToken from "./utils/hashToken.js"
import cookieParser from "cookie-parser";
import { createAccessToken, createRefreshToken } from "./utils/token.js";

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

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User with this email already exists."
      });
    }

    // Hash password
    const hashedPassword =
      await hashPassword(password);

    // Create temporary user object for token generation
    const tempUser = { email };

    // Generate tokens
    const accessToken =
      createAccessToken(tempUser);

    const refreshToken =
      createRefreshToken(tempUser);

    // Hash refresh token before DB storage
    const hashedRefreshToken =
      await hashToken(refreshToken);

    // Insert user + hashed refresh token
    const newUser = await db.query(
      `
            INSERT INTO users(
                name,
                email,
                password,
                refresh_token
            )
            VALUES($1,$2,$3,$4)
            RETURNING id,name,email
            `,
      [
        name,
        email,
        hashedPassword,
        hashedRefreshToken
      ]
    );

    const user = newUser.rows[0];

    // Create final access token with DB id
    const finalAccessToken =
      createAccessToken(user);

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth/refresh"
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000
    });

    return res.status(201).json({
      message: "Account created successfully",
      accessToken: finalAccessToken,
      user
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error"
    });
  }
});

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