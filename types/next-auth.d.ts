/**
 * extend NextAuth types
 */
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * this is returned by useSession, getSession and received as a props
   * on the SessionPrivider React Context
   */
  interface Session {
    user: {
      name: string
      role: string
    }
  }
}
