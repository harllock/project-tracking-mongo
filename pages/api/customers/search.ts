import type { NextApiRequest, NextApiResponse } from "next"

import { global } from "../../../config"
import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()
    const collection = db.collection("Customer")

    const body = req.body
    const skip = body.offset
    const magicSearch = body.magicSearch
    const pageSize = global.pageSize
    const search = new RegExp(magicSearch, "i")

    const cursor = collection.aggregate([
      {
        $match: {
          $and: [{ magicSearch: { $regex: search } }],
        },
      },
      {
        $facet: {
          data: [{ $sort: { name: 1 } }, { $skip: skip }, { $limit: pageSize }],
          count: [{ $count: "count" }],
        },
      },
    ])

    /** mongoDB returns an array of Documents */
    const mongoResultArray = await cursor.toArray()
    /** this is the Document returned by the query */
    const mongoResult = mongoResultArray[0]

    /** extract the data array */
    const data: {}[] = mongoResult.data
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
  } catch (err) {
    root.logError({
      section: "api",
      summary: "could not search activities on db",
      where: "/api/customers/search.ts",
      stack: err,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}

// const cursor = db.collection("Customer").aggregate([
//   {
//     $match: {
//       $and: [
//         { magicSearch: { $regex: /rome/i } },
//         { magicSearch: { $regex: /IT12345/i } },
//       ],
//     },
//   },
//   {
//     $facet: {
//       data: [{ $sort: { name: 1 } }, { $skip: skip }, { $limit: pageSize }],
//       count: [{ $count: "count" }],
//     },
//   },
// ])
