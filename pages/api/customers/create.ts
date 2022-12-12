import type { NextApiRequest, NextApiResponse } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body
    const { db } = await mongoConnect()

    await db.collection("Customer").insertOne(body)

    return res.status(200).json({ status: "success", text: "Customer added" })
  } catch (err) {
    root.logError({
      section: "api",
      summary: "could not a new customer in db",
      where: "/api/customers/create.js",
      stack: err,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}
