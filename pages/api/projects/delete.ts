import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { clientPromise } from "../../../lib/mongodb"
import { root } from "../../../helpers/root"
import { _Project } from "../../../types/interfaces/resources/_Project"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("project")

    const body: _Project = req.body

    const objectId = new ObjectId(body._id)
    const query = { _id: objectId }

    await collection.deleteOne(query)

    return res.status(200).json({ status: "success", text: "Project deleted" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not delete a project from db",
      where: "/api/projects/delete.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}