import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { Session } from "next-auth"

import { global } from "../../../config"
import { mongoConnect } from "../../../lib/mongoConnect"
import { root } from "../../../helpers/root"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session)
      return res.status(401).json(root.messageUnauthenticatedRequest())

    const { db } = await mongoConnect()
    const collection = db.collection("User")

    const body = req.body
    const skip = body.offset
    const pageSize = global.pageSize

    const matchClause = _createMatchClause(body, session)

    const cursor = collection.aggregate([
      {
        $match: {
          $and: matchClause,
        },
      },
      {
        $facet: {
          data: [{ $sort: { name: 1 } }, { $skip: skip }, { $limit: pageSize }],
          count: [{ $count: "count" }],
        },
      },
    ])

    /** get an array of documents from the cursor */
    const mongoResultArray = await cursor.toArray()

    /** there is only one element in the array */
    const mongoResult = mongoResultArray[0]

    /** extract the data array */
    const data: {}[] = mongoResult.data

    /**
     * extract the result count
     * if count array result is empty return a count of 0 otherwise
     * return count number
     */
    const count: number =
      mongoResult.count.length === 0 ? 0 : mongoResult.count[0].count

    /** create the result object */
    const result = { data, count }

    res.status(200).json(result)
  } catch (error) {
    root.logError({
      section: "api",
      summary: "could not search users on db",
      where: "/api/users/search.ts",
      stack: error,
    })
    return res.status(500).json(root.messageContactSupport())
  }
}

function _createMatchClause(body: { [key: string]: string }, session: Session) {
  const email = session.user.email
  const role = session.user.role

  /** get search string */
  const magicSearchString = body.magicSearch

  /**
   * if magicSearchString is empty RegExp will be: /(?:)/i that match
   * anything case insensitive
   * if magicSearchString is like 'appl' RegExp will be: /appl/i that match
   * all items with appl in magicSearch field
   **/
  const search = new RegExp(magicSearchString, "i")

  interface _MatchClause {
    magicSearch?: object
    email?: string
  }

  /** if user has admin role just filter magicSearch field */
  const matchClause: _MatchClause[] = [{ magicSearch: { $regex: search } }]

  /** if user has user role add user email to the matchClause filter */
  if (role === "user") matchClause.push({ email })

  return matchClause
}
