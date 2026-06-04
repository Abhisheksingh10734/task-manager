import bcrypt from "bcrypt";

const saltRounds = Number(process.env.SALT_ROUNDS);

const hashToken = async (refreshToken) => {
    const hashedToekn = await bcrypt.hash(
        refreshToken,
        saltRounds
    );

    return hashedToekn;
}

export default hashToken;