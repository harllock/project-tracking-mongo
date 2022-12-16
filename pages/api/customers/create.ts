import type { NextApiRequest, NextApiResponse } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"
import { _Customer } from "../../../types/interfaces/resources/_Customer"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()
    const collection = db.collection("Customer")

    const body: _Customer = req.body

    const magicSearch = _createMagicSearchField(body)
    body.magicSearch = magicSearch

    await collection.insertOne(body)

    return res.status(200).json({ status: "success", text: "Customer added" })
  } catch (err) {
    root.logError({
      section: "api",
      summary: "could not insert new customer in db",
      where: "/api/customers/create.js",
      stack: err,
    })
    res.status(500).json(root.messageContactSupport())
  }
}

function _createMagicSearchField(body: _Customer) {
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
