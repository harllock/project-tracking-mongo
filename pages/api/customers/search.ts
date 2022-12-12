import type { NextApiRequest, NextApiResponse } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()

    const cursor = db.collection("Customer").aggregate([
      { $match: {} },
      {
        $facet: {
          data: [],
          count: [{ $count: "count" }],
        },
      },
    ])

    const [
      {
        data,
        count: [{ count }],
      },
    ] = await cursor.toArray()

    const result = { data, count }

    console.log(result)

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
