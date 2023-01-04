import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { Decimal128, ObjectId } from "mongodb"

import { clientPromise } from "../../../lib/mongodb"
import { root } from "../../../helpers/root"
import {
  _Project,
  _ProjectMongo,
} from "../../../types/interfaces/resources/_Project"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("project")

    const body: _Project = req.body

    const noSearchFields = [
      "_id",
      "customerId",
      "deliveryDate",
      "magicSearch",
      "startDate",
      "userId",
    ]
    const magicSearch = root.dbCreateMagicSearchField({ body, noSearchFields })
    body.magicSearch = magicSearch

    body.cost = "100" /** temp, replace with activities costs */

    const mongoBody = _mongoFormat(body)

    await collection.insertOne(mongoBody)

    return res.status(200).json({ status: "success", text: "Project added" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not insert new project in db",
      where: "/api/projects/create.ts",
      stack: error,
    })
    res.status(500).json(root.messageContactSupport())
  }
}

function _mongoFormat(body: _Project): _ProjectMongo {
  const mongoBody: _ProjectMongo = {
    ...body,
    /** convert string date from client side to Date object */
    startDate: new Date(body.startDate),
    deliveryDate: new Date(body.deliveryDate),

    /** convert strings to integers */
    days: +body.days,

    /** convert string to Decimal128 */
    cost: Decimal128.fromString(body.cost),
    pricing: Decimal128.fromString(body.pricing),

    /** convert string _id to mongodb ObjectId */
    customerId: new ObjectId(body.customerId),
    userId: new ObjectId(body.userId),
  }

  return mongoBody
}
