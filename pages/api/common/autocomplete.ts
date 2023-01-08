import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { clientPromise } from "../../../lib/mongodb"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const body = req.body
    const resource = body.resource

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection(resource)

    const searchString = body.searchValue
    const search = new RegExp(searchString, "i")

    const cursor = collection
      .find({ name: { $regex: search } }, { projection: { name: 1 } })
      .limit(5)
      .sort({ name: 1 })

    /** item fetched from db are like: [{_id: xxx, name: "Barilla"}] */
    const data = await cursor.toArray()

    /** reformat data in Mantine Autocomplete expected shape: [{value: "Barilla", ...}] */
    const result = data.map((item) => {
      return { value: item.name, _id: item._id.toString() }
    })

    res.status(200).json(result)
  } catch (error) {
    const resource = req.body.resource
    root.logError({
      section: "api",
      summary: `could not fetch ${resource} items to be used in autocomplete field`,
      where: "/api/common/autocomplete.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}
