import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

import { clientPromise } from "../../../lib/mongodb"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const client = await clientPromise
    const db = client.db()
    const collection = db.collection("user")

    const body = req.body

    body.magicSearch = _createMagicSearchField(body)

    body.password = await _hashPassword(body)

    await collection.insertOne(body)

    return res.status(200).json({ status: "success", text: "User added" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not insert new user in db",
      where: "/api/users/create.ts",
      stack: error,
    })
    res.status(500).json(root.messageContactSupport())
  }
}

function _createMagicSearchField(body: { [key: string]: any }) {
  const noSearchFields = ["_id", "password"]
  const magicSearch = root.dbCreateMagicSearchField({ body, noSearchFields })
  return magicSearch
}

async function _hashPassword(body: { [key: string]: any }) {
  const password = body.password
  const hashedPassword = await root.authHashPassword(password)
  if (!hashedPassword) throw new Error("could not hash the password")
  return hashedPassword
}
