import bcrypt from "bcrypt";

export default function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}