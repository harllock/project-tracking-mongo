import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"
import { _Customer } from "../../../types/interfaces/resources/_Customer"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()
    const collection = db.collection("Customer")

    const body: _Customer = req.body

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
