import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { Collection } from "mongodb"
import dayjs from "dayjs"

import { global } from "../../../config"
import { clientPromise } from "../../../lib/mongodb"
import { root } from "../../../helpers/root"
import {
  _Activity,
  _ActivityMongo,
} from "../../../types/interfaces/resources/_Activity"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("activity")

    const body = req.body

    const cursor = _getCursor({ body, collection })

    /** get an array of documents from the cursor */
    const mongoResultArray = await cursor.toArray()

    /** there is only one element in the array */
    const mongoResult = mongoResultArray[0]

    /** extract the data array */
    const mongoData: _ActivityMongo[] = mongoResult.data
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
      summary: "could not search activities on db",
      where: "/api/activities/search.ts",
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
        /** customer collection */
        from: "customer",
        /** customer field on activity collection, here mongo insert customer id */
        localField: "customerId",
        /** id field in customer collection */
        foreignField: "_id",
        /**
         * all fields of related customer is placed in the new array
         * field customerData
         */
        as: "customerData",
        /**
         * filter which customer fields will be in customerData;
         * _id is present by default, we add here only name field
         */
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    {
      /** get related project resource from matched data */
      $lookup: {
        /** project collection */
        from: "project",
        /** project field on activity collection, here mongo insert project id */
        localField: "projectId",
        /** id field in project collection */
        foreignField: "_id",
        /**
         * all fields of related project is placed in the new array
         * field projectData
         */
        as: "projectData",
        /**
         * filter which project fields will be in projectData;
         * _id is present by default, we add here only name field
         */
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    {
      /** get related user resource from matched data */
      $lookup: {
        /** user collection */
        from: "user",
        /** user field on activity collection, here mongo insert user id */
        localField: "userId",
        /** id field in user collection */
        foreignField: "_id",
        /**
         * all fields of related user is placed in the new array
         * field userData
         */
        as: "userData",
        /**
         * filter which user fields will be in userData;
         * _id is present by default, we add here only name field
         */
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    {
      /**
       * customerData is an array; extract first element from it, get
       * customerData.name value and put it in a new handy root level
       * customerName field
       */
      $addFields: {
        customerName: { $first: "$customerData.name" },
      },
    },
    {
      /**
       * projectData is an array; extract first element from it, get
       * projectData.name value and put it in a new handy root level
       * projectName field
       */
      $addFields: {
        projectName: { $first: "$projectData.name" },
      },
    },
    {
      /**
       * userData is an array; extract first element from it, get
       * userData.name value and put it in a new handy root level
       * userName field
       */
      $addFields: {
        userName: { $first: "$userData.name" },
      },
    },
    {
      /** process result from previous pipelines in following parallel ways: */
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

function _formatFromMongo(mongoData: _ActivityMongo[]): _Activity[] {
  const data = mongoData.map((mongoItem) => {
    const item = {
      ...mongoItem,
      _id: mongoItem._id!.toString(),
      cost: mongoItem.cost.toString(),
      customerId: mongoItem.customerId.toString(),
      extra: mongoItem.extra.toString(),
      hours: mongoItem.hours.toString(),
      projectId: mongoItem.projectId.toString(),
      startDate: dayjs(mongoItem.startDate).format(),
      userId: mongoItem.userId.toString(),
    }
    return item
  })
  return data
}
