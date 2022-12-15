import type { NextApiRequest, NextApiResponse } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"
import { _Customer } from "../../../types/interfaces/resources/_Customer"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()

    const body: { [key: string]: string } = req.body

    const magicSearch = _createMagicSearchField(body)
    body.magicSearch = magicSearch

    await db.collection("Customer").insertOne(body)

    return res.status(200).json({ status: "success", text: "Customer added" })
  } catch (err) {
    root.logError({
      section: "api",
      summary: "could not a new customer in db",
      where: "/api/customers/create.js",
      stack: err,
    })
    res.status(500).json(root.messageContactSupport())
  }
}

function _createMagicSearchField(body: { [key: string]: string }) {
  const noSearchFields = ["_id", "magicSearch"]

  const filteredObj = root.utilsFilterProp({
    obj: body,
    props: noSearchFields,
  })

  const magicSearchField = Object.values(filteredObj)
    .filter((value) => value !== "")
    .join(" ")

  return magicSearchField
}
