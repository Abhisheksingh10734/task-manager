import db from "../db/index.js";
import { loginUser } from "../services/login.services.js";
import hashToken from "../utils/hashToken.js";
import { createAccessToken, createRefreshToken } from "../utils/token.js";

const login = async (req, res) => {
    try {
        const user = await loginUser(req.body);

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);

        const hashedRefreshToken = await hashToken(refreshToken);

        await db.query(
            "UPDATE users SET refresh_token = $1 WHERE id = $2",
            [hashedRefreshToken, user.id]
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth/refresh"
        });

        return res.status(200).json({
            message: "Login successful",
            user: user.user
        });

    } catch (error) {
        console.error(error);

        return res.status(400).json({
            message: error.message || "Login failed"
        });
    }
};

export default login;