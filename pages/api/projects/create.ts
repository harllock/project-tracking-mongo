import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"
import { _Project } from "../../../types/interfaces/resources/_Project"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const { db } = await mongoConnect()
    const collection = db.collection("Customer")

    const body: _Project = req.body

    const noSearchFields = ["_id", "magicSearch"]
    const magicSearch = root.dbCreateMagicSearchField({ body, noSearchFields })
    body.magicSearch = magicSearch

    console.log(1111, body)
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not insert new project in db",
      where: "/api/projects/create.ts",
      stack: error,
    })
    res.status(500).json(root.messageContactSupport())
  }
}
