import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { Decimal128, ObjectId } from "mongodb"

import { clientPromise } from "../../../lib/mongodb"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("lead")

    const body = req.body

    const mongoBody = _formatForMongo(body)

    const query = { _id: mongoBody._id }

    await collection.replaceOne(query, mongoBody)

    return res.status(200).json({ status: "success", text: "Lead updated" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not update a lead in db",
      where: "/api/leads/update.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}

function _formatForMongo(body: { [key: string]: any }) {
  const noSearchFields = ["_id", "customerId", "startDate", "userId"]

  const magicSearch = root.dbCreateMagicSearchField({ body, noSearchFields })

  const mongoBody = {
    ...body,

    /** convert string date from client side to Date object */
    startDate: new Date(body.startDate),

    /** convert strings to integers */
    days: +body.days,

    /** convert string to Decimal128 */
    pricing: Decimal128.fromString(body.pricing),

    /** convert string _id to mongodb ObjectId */
    _id: new ObjectId(body._id),
    customerId: new ObjectId(body.customerId),
    userId: new ObjectId(body.userId),

    magicSearch,
  }
  return mongoBody
}
