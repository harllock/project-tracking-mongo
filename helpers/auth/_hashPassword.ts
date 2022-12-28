import { root } from "../root"
/**
 * remember to install both:
 * yarn add bcryptjs
 * yarn add @types/bcryptjs
 */
import { hash } from "bcryptjs"

export default async (password: string) => {
  try {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
  } catch (error) {
    root.logError({
      section: "root/auth",
      summary: "could not hash a password",
      where: "helpers/auth/_hashPassword.ts",
      stack: error,
    })
  }
}
