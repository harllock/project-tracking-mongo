import type { NextApiRequest, NextApiResponse } from "next"

import { global } from "../../../config"
import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()

    const body = req.body
    const pageSize = global.pageSize
    const skip = body.offset
    const magicSearch = body.magicSearch
    const search = new RegExp(magicSearch, "i")

    const cursor = db.collection("Customer").aggregate([
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
    /** this is the Document resulting from the query */
    const mongoResult = mongoResultArray[0]

    /** get the data array */
    const data: [] = mongoResult.data
    /**
     * if count array result is empty return 0 as count, otherwise
     * extract count number
     */
    const count: [] =
      mongoResult.count.length === 0 ? 0 : mongoResult.count[0].count

    // create the result object
    const result = { data, count }

    res.status(200).json(result)
  } catch (err) {
    root.logError({
      section: "api",
      summary: "could not search activities on db",
      where: "/api/customers/search.js",
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
