import { signupUser } from "../services/signup.services.js";

export const signup = async (req, res) => {
  try {
    const result = await signupUser(req.body);

    res.cookie("refreshToken", result.refreshToken, result.refreshCookieOptions);
    res.cookie("accessToken", result.accessToken, result.accessCookieOptions);

    return res.status(201).json({
      message: "Account created successfully",
      user: result.user
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};