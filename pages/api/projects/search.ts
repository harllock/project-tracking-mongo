import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { Collection } from "mongodb"

import { global } from "../../../config"
import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const { db } = await mongoConnect()
    const collection = db.collection("Project")

    const body = req.body

    const cursor = _getCursor({ body, collection })

    /** get an array of documents from the cursor */
    const mongoResultArray = await cursor.toArray()

    /** there is only one element in the array */
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
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not search projects on db",
      where: "/api/projects/search.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}

interface _Props {
  body: { [key: string]: string }
  collection: Collection
}

function _getCursor({ body, collection }: _Props) {
  const skip = body.offset
  const magicSearch = body.magicSearch
  const pageSize = global.pageSize
  const search = new RegExp(magicSearch, "i")

  const cursor = collection.aggregate([
    {
      /** match data using magicSearch field as a filter */
      $match: {
        $and: [{ magicSearch: { $regex: search } }],
      },
    },
    {
      /** get related customer resource from matched data */
      $lookup: {
        from: "Customer",
        localField: "customerId",
        foreignField: "_id",
        /**
         * all fields of related customer is placed in the new array
         * field customerData
         */
        as: "customerData",
        /**
         * filter which customerData fields will be in customerData;
         * _id is present by default, we add here only name field
         */
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    {
      /** get related user resource from matched data */
      $lookup: {
        from: "User",
        localField: "userId",
        foreignField: "_id",
        /**
         * all fields of related user is placed in the new array
         * field userData
         */
        as: "userData",
        /**
         * filter which userData fields will be in userData;
         * _id is present by default, we add here only name field
         */
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    {
      /**
       * customerData is an array; extract first element from it, get
       * customerData.name value and put it in a new root level
       * customerName field
       */
      $addFields: {
        customerName: { $first: "$customerData.name" },
      },
    },
    {
      /**
       * userData is an array; extract first element from it, get
       * userData.name value and put it in a new root level
       * userName field
       */
      $addFields: {
        userName: { $first: "$userData.name" },
      },
    },
    {
      /** result from previous pipelines are: */
      $facet: {
        /** sorted, skipped and limited and inserted in an array called data */
        data: [{ $sort: { name: 1 } }, { $skip: skip }, { $limit: pageSize }],
        /** counted and inserted in an array called count */
        count: [{ $count: "count" }],
      },
    },
  ])

  return cursor
}
