import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const { db } = await mongoConnect()
    const collection = db.collection("User")

    interface _Body {
      _id: ObjectId
      password: string
      repeatPassword: string
    }

    const body: _Body = req.body

    const objectId = new ObjectId(body._id)

    if (body.password !== body.repeatPassword)
      return res
        .status(401)
        .json({ status: "error", text: "Password do not match" })
    const password = body.password
    const hashedPassword = await root.authHashPassword(password)

    await collection.updateOne(
      { _id: objectId },
      { $set: { password: hashedPassword } }
    )

    return res
      .status(200)
      .json({ status: "success", text: "User password updated" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not update the user password in db",
      where: "/api/users/updatePassword.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}
