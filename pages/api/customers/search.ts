import type { NextApiRequest, NextApiResponse, NextPage } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()
    const result = await db.collection("Customer").find({}).toArray()
    console.log(2222, result)
    res.status(200).json(result)
  } catch (error) {}
}
