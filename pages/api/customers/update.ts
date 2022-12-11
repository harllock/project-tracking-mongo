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
    const updatedObj = root.utilsFilterProp({ obj: body, prop: "_id" })

    const result = await db.collection("Customer").replaceOne(query, updatedObj)

    return res.status(200).json({ status: "success", text: "Customer added" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not update a customer in db",
      where: "/api/customers/update.js",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}