import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"
import { _User } from "../../../types/interfaces/resources/_User"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const { db } = await mongoConnect()
    const collection = db.collection("User")

    const body: _User = req.body

    const objectId = new ObjectId(body._id)
    const query = { _id: objectId }

    await collection.deleteOne(query)

    return res.status(200).json({ status: "success", text: "User deleted" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not delete a user in db",
      where: "/api/users/delete.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}
