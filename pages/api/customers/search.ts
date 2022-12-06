import type { NextApiRequest, NextApiResponse, NextPage } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  console.log(1111)
  const { db } = await mongoConnect()
  const result = await db.collection("Customer").find({}).toArray()
  console.log(2222, result)
  res.status(200).json(result)
}
