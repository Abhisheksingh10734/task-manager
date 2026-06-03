export const validateSignup = ({ name, email, password }) => {

    if(!name.trim()) return { name: "Name is required" };
    if (name.length < 3) return { name: "Name must be at least 3 characters" };

    if (!email.trim()) return { email: "Email is required" };
    if (!/\S+@\S+\.\S+/.test(email)) return { email: "Invalid email format" };

    if (!password.trim()) return { password: "Password is required" };
    if (password.length < 6) return { password: "Password must be at least 6 characters" };

    return {};
};