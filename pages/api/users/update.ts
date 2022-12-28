import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"
import { _User } from "../../../types/interfaces/resources/_User"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()
    const collection = db.collection("User")

    const body: _User = req.body

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

function _createMagicSearchField(body: _User) {
  const noSearchFields = ["_id", "magicSearch", "password"]
  const magicSearch = root.dbCreateMagicSearchField({ body, noSearchFields })
  return magicSearch
}
