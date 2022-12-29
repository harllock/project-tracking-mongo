import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"
import { _Customer } from "../../../types/interfaces/resources/_Customer"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const { db } = await mongoConnect()
    const collection = db.collection("Customer")

    const body: _Customer = req.body

    const objectId = new ObjectId(body._id)
    const query = { _id: objectId }

    await collection.deleteOne(query)

    return res.status(200).json({ status: "success", text: "Customer deleted" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not delete a customer in db",
      where: "/api/customers/delete.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}
