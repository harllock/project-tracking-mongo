import { root } from "../root"
/**
 * remember to install both:
 * yarn add bcryptjs
 * yarn add @types/bcryptjs
 */
import { compare } from "bcryptjs"

export default async (password: string, hashedPassword: string) => {
  try {
    const isValid = await compare(password, hashedPassword)
    return isValid
  } catch (error) {
    root.logError({
      section: "root/auth",
      summary: "could not compare passwords",
      where: "helpers/auth/_compareHash.ts",
      stack: error,
    })
  }
}
