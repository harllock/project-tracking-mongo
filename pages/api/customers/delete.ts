import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()
    const body = req.body
    const objectId = new ObjectId(body._id)
    const query = { _id: objectId }

    const result = await db.collection("Customer").deleteOne(query)

    return res.status(200).json({ status: "success", text: "Customer deleted" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not delete a customer in db",
      where: "/api/customers/delete.js",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}
