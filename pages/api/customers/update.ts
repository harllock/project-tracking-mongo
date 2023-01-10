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
    const collection = db.collection("customer")

    const body = req.body

    const noSearchFields = ["_id", "magicSearch"]
    const magicSearch = root.dbCreateMagicSearchField({ body, noSearchFields })
    body.magicSearch = magicSearch

    const objectId = new ObjectId(body._id)
    const query = { _id: objectId }
    body._id = objectId

    await collection.replaceOne(query, body)

    return res.status(200).json({ status: "success", text: "Customer updated" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not update a customer in db",
      where: "/api/customers/update.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}
