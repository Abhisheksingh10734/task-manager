import bcrypt from "bcrypt";

const saltRounds = Number(process.env.SALT_ROUNDS);

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(
        password,
        saltRounds
    );

    return hashedPassword;
}

export default hashPassword;