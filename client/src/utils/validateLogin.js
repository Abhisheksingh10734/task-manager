export const validateLogin = ({ email, password }) => {

    if (!email.trim()) return { email: "Email is required" };
    if (!/\S+@\S+\.\S+/.test(email)) return { email: "Invalid email format" };

    if (!password.trim()) return { password: "Password is required" };
    if (password.length < 6) return { password: "Password must be at least 6 characters" };

    return {};
};