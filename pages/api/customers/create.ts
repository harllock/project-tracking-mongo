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

    const noSearchFields = ["_id", "magicSearch"]
    const magicSearch = root.dbCreateMagicSearchField({ body, noSearchFields })
    body.magicSearch = magicSearch

    await collection.insertOne(body)

    return res.status(200).json({ status: "success", text: "Customer added" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not insert new customer in db",
      where: "/api/customers/create.ts",
      stack: error,
    })
    res.status(500).json(root.messageContactSupport())
  }
}
