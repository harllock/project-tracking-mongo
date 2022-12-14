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

    const noSearchFields = ["_id"]
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
    return res.status(500).json(root.messageContactSupport())
  }
}
