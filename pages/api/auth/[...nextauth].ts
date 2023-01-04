// @ts-nocheck
import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import { clientPromise } from "../../../lib/mongodb"

import { root } from "../../../helpers/root"

export default NextAuth({
  providers: [
    CredentialProvider({
      authorize: _authorize,
    }),
  ],
  session: {
    /** jwt is the default, we set it here explicitly */
    strategy: "jwt",
    /** 30 days expressed in second as session expiration time */
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    /**
     * jwt callback is called whenever JSON Web Token is created (signIn)
     * or updated (whenever session is accessed - getSession, useSession)
     * the returned value will be encrypted and it is stored in a cookie;
     * user are only passed the first time this callback is called in
     * a new session (signIn). In subsequent calls only token will be available
     */
    async jwt({ token, user }) {
      /** user passed only with signIn */
      if (user) {
        token.user = user
      }
      return token
    },
    /**
     * session callback is called whenever a session is checked. By default,
     * only a subset of the token is returned for increased security.
     * jwt callback is invoked before the session callback, so anything you
     * add to the JSON Web Token will be immediately available in the session
     * callback
     */
    async session({ session, token }) {
      if (token) {
        session.user = token.user as {}
      }
      return session
    },
  },
  // site: "localhost:3000",
})

async function _authorize(credentials) {
  try {
    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("user")

    /** search user email in the db */
    const email = credentials?.email
    const user = await collection.findOne({ email: email })

    /**
     * if submitted email is not in the db log the error;
     * NextAuth will return an error that we override in login page
     */
    if (!user) {
      root.logError({
        section: "api",
        summary: `submitted email ${email} was not found in the db`,
        where: "/api/auth/[...nextauth].js",
        stack: "no stack error",
      })
      throw new Error("user email not found")
    }

    /**
     * if user was found compare submitted password with stored
     * hashed password
     */
    const submittedPassword = credentials!.password
    const storedPassword = user.password
    const isPasswordValid = await root.authCompareHash(
      submittedPassword,
      storedPassword
    )

    /**
     * if submitted password is not valid log the error;
     * NextAuth will return an error that we override in login page
     */
    if (!isPasswordValid) {
      root.logError({
        section: "api",
        summary: `submitted user password is invalid`,
        where: "/api/auth/[...nextauth].js",
        stack: "no stack error",
      })
      throw new Error("password is incorrect")
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (err) {
    root.logError({
      section: "api",
      summary: "next-auth api return an error while handling the request",
      where: "/api/auth/[...nextauth].js",
      stack: err,
    })
    return null
  }
}
