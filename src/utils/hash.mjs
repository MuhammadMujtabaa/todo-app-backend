import bcryptjs from "bcryptjs";

const saltRounds = 10;

export const hashPassword = (password) => {
    const salt = bcryptjs.genSaltSync(saltRounds)
    const hash = bcryptjs.hashSync(password, salt)
    return hash
}

export const comparePassword = (plainPassword, hashedPassword) => {
    return bcryptjs.compareSync(plainPassword, hashedPassword)
}