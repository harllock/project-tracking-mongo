import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await mongoConnect()

    const body: { [key: string]: string } = req.body

    const magicSearch = _createMagicSearchField(body)
    body.magicSearch = magicSearch

    const objectId = new ObjectId(body._id)
    const query = { _id: objectId }
    const updatedObj = root.utilsFilterProp({ obj: body, props: ["_id"] })

    await db.collection("Customer").replaceOne(query, updatedObj)

    return res.status(200).json({ status: "success", text: "Customer updated" })
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not update a customer in db",
      where: "/api/customers/update.js",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
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
