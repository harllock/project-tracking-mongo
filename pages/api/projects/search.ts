import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { Collection } from "mongodb"
import dayjs from "dayjs"

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
    const collection = db.collection("project")

    const body = req.body

    const cursor = _getCursor({ body, collection })

    /** get an array of documents from the cursor */
    const mongoResultArray = await cursor.toArray()

    /** there is only one element in the array */
    const mongoResult = mongoResultArray[0]

    /** extract the data array */
    const mongoData = mongoResult.data
    const data = _formatFromMongo(mongoData)

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
  const searchString = body.searchString
  const searchStringRegExp = new RegExp(searchString, "i")
  const pageSize = global.pageSize

  const cursor = collection.aggregate([
    /** match project items using magicSearch field as a filter */
    {
      $match: {
        $and: [{ magicSearch: { $regex: searchStringRegExp } }],
      },
    },

    /** get related customer resource from match stage */
    {
      $lookup: {
        /** customer collection */
        from: "customer",
        /** local field to be used in the lookup*/
        localField: "customerId",
        /** id field in customer collection */
        foreignField: "_id",
        /**
         * all fields of related customer resource is placed in the new array
         * field named customerData
         */
        as: "customerData",
        /** project only _id (by default) and name from customerData */
        pipeline: [{ $project: { name: 1 } }],
      },
    },

    /** get related user resource from match stage */
    {
      $lookup: {
        /** user collection */
        from: "user",
        /** local field to be used in the lookup*/
        localField: "userId",
        /** id field in user collection */
        foreignField: "_id",
        /**
         * all fields of related user resource is placed in the new array
         * field named userData
         */
        as: "userData",
        /** project only _id (by default) and name from userData */
        pipeline: [{ $project: { name: 1 } }],
      },
    },

    /**
     * extract name from customerData and put in the root level customerName
     */
    {
      $addFields: {
        customerName: { $first: "$customerData.name" },
      },
    },

    /**
     * extract name from userData and put in the root level userName
     */
    {
      $addFields: {
        userName: { $first: "$userData.name" },
      },
    },

    /** remove magicSearch field from result */
    {
      $project: { magicSearch: 0 },
    },

    /** process result from previous pipelines in following parallel ways: */
    {
      $facet: {
        /** sort, skip, limit and then insert result in an array called data */
        data: [{ $sort: { name: 1 } }, { $skip: skip }, { $limit: pageSize }],
        /** count result item and insert the number in an array called count */
        count: [{ $count: "count" }],
      },
    },
  ])
  return cursor
}

function _formatFromMongo(mongoData: { [key: string]: any }[]) {
  const data = mongoData.map((mongoItem) => {
    const item = {
      ...mongoItem,
      _id: mongoItem._id.toString(),
      cost: mongoItem.cost.toString(),
      customerId: mongoItem.customerId.toString(),
      days: mongoItem.days.toString(),
      deliveryDate: dayjs(mongoItem.deliveryDate).format(),
      pricing: mongoItem.pricing.toString(),
      startDate: dayjs(mongoItem.startDate).format(),
      userId: mongoItem.userId.toString(),
    }
    return item
  })
  return data
}
