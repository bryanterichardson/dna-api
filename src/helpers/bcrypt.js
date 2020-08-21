import bcrypt from 'bcrypt'

const saltRounds = 10;

export const comparePasswordHash = (plainTextPassword, hash) => {
    return bcrypt.compare(plainTextPassword, hash)
}

export const genPasswordHash = (plainTextPassword) => {
    return bcrypt.hash(plainTextPassword, saltRounds)
}