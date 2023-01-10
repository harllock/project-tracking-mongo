import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { global } from "../../../config"
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
    const skip = body.offset
    const searchString = body.searchString
    const pageSize = global.pageSize
    const searchStringRegExp = new RegExp(searchString, "i")

    const cursor = collection.aggregate([
      {
        $match: {
          $and: [{ magicSearch: { $regex: searchStringRegExp } }],
        },
      },

      /** remove magicSearch field from result */
      {
        $project: { magicSearch: 0 },
      },

      {
        $facet: {
          data: [{ $sort: { name: 1 } }, { $skip: skip }, { $limit: pageSize }],
          count: [{ $count: "count" }],
        },
      },
    ])

    /** get an array of documents from the cursor */
    const mongoResultArray = await cursor.toArray()

    /** there is only one element in the array */
    const mongoResult = mongoResultArray[0]

    /** extract the data array */
    const data = mongoResult.data

    /**
     * extract the result count
     * if count array result is empty return a count of 0 otherwise
     * return count number
     */
    const count: number =
      mongoResult.count.length === 0 ? 0 : mongoResult.count[0].count

    /** create the result object */
    const result = { data, count }

    res.status(200).json(result)
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not search activities on db",
      where: "/api/customers/search.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}
