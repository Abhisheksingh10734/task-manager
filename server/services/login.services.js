import db from "../db/index.js";
import comparePassword from "../utils/comparePass.js";

export const loginUser = async ({ email, password }) => {

    const result = await db.query(
        "SELECT id, name, email, password FROM users WHERE email = $1",
        [email]
    );

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    const user = result.rows[0];

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
};