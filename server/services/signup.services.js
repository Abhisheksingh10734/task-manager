import db from "../db/index.js";
import hashPassword from "../utils/hashPass.js"
import hashToken from "../utils/hashToken.js"
import { createAccessToken, createRefreshToken } from "../utils/token.js";

export const signupUser = async ({ name, email, password }) => {

  const existingUser = await db.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const tempUser = { email };

  const accessToken = createAccessToken(tempUser);
  const refreshToken = createRefreshToken(tempUser);

  const hashedRefreshToken = await hashToken(refreshToken);

  const newUser = await db.query(
    `INSERT INTO users(name, email, password, refresh_token)
     VALUES($1,$2,$3,$4)
     RETURNING id, name, email`,
    [name, email, hashedPassword, hashedRefreshToken]
  );

  const user = newUser.rows[0];

  const finalAccessToken = createAccessToken(user);

  return {
    user,
    accessToken: finalAccessToken,
    refreshToken,
    accessCookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000
    },
    refreshCookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth/refresh"
    }
  };
};