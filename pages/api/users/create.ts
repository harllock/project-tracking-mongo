import { NextApiRequest, NextApiResponse } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"
import { _User } from "../../../types/interfaces/resources/_User"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()
    const collection = db.collection("User")

    const body: _User = req.body

    const magicSearch = _createMagicSearchField(body)
    body.magicSearch = magicSearch

    await collection.insertOne(body)

    return res.status(200).json({ status: "success", text: "User added" })
  } catch (err) {
    root.logError({
      section: "api",
      summary: "could not insert new user in db",
      where: "/api/users/create.js",
      stack: err,
    })
    res.status(500).json(root.messageContactSupport())
  }
}

function _createMagicSearchField(body: _User) {
  const noSearchFields = ["_id", "magicSearch"]

  /**
   * typecast body from _Customer to index signature
   * https://bobbyhadz.com/blog/typescript-conversion-of-type-to-type-may-be-mistake
   */
  const obj = body as unknown as { [key: string]: string }

  const filteredObj = root.utilsFilterProp({
    obj,
    props: noSearchFields,
  })

  const magicSearchField = Object.values(filteredObj)
    .filter((value) => value !== "")
    .join(" ")

  return magicSearchField
}
