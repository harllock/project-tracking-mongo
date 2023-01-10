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
    const collection = db.collection("activity")

    const body = req.body

    const mongoBody = _formatForMongo(body)

    await collection.insertOne(mongoBody)

    return res.status(200).json({ status: "success", text: "Activity added" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not insert new activity in db",
      where: "/api/activities/create.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}

function _formatForMongo(body: { [key: string]: any }) {
  const noSearchFields = ["_id", "projectId", "startDate", "userId"]

  const magicSearch = root.dbCreateMagicSearchField({ body, noSearchFields })

  const mongoBody = {
    ...body,

    /** convert string date from client side to Date object */
    startDate: new Date(body.startDate),

    /** convert string to Decimal128 */
    cost: Decimal128.fromString("100"),
    extra: Decimal128.fromString(body.extra),
    hours: Decimal128.fromString(body.hours),

    /** convert string _id to mongodb ObjectId */
    projectId: new ObjectId(body.projectId),
    userId: new ObjectId(body.userId),

    magicSearch,
  }
  return mongoBody
}
