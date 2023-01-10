import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { clientPromise } from "../../../lib/mongodb"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("user")

    const body = req.body

    body.magicSearch = _createMagicSearchField(body)

    const objectId = new ObjectId(body._id)
    const query = { _id: objectId }
    body._id = objectId

    await collection.replaceOne(query, body)

    return res.status(200).json({ status: "success", text: "User updated" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not update a user in db",
      where: "/api/users/update.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}

function _createMagicSearchField(body: { [key: string]: any }) {
  const noSearchFields = ["_id", "magicSearch", "password"]
  const magicSearch = root.dbCreateMagicSearchField({ body, noSearchFields })
  return magicSearch
}
