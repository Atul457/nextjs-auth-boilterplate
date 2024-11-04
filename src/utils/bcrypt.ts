import bcryptLib from 'bcryptjs'

async function hashPassword(password: string) {
  try {
    const saltRounds = 10
    const hashedPassword = await bcryptLib.hash(password, saltRounds)
    return hashedPassword
  } catch (error) {
    throw new Error('Error hashing password')
  }
}

async function comparePassword(plaintextPassword: string, hashedPassword: string) {
  try {
    const match = await bcryptLib.compare(plaintextPassword, hashedPassword)
    return match
  } catch (error) {
    return false
  }
}

const bcrypt = {
  hashPassword,
  comparePassword
}

export { bcrypt }
