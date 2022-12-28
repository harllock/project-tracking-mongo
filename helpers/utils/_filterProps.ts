import { ObjectId } from "mongodb"
import { root } from "../root"

interface _IndexSignature {
  [key: string]: string | ObjectId
}

interface _Props {
  obj: _IndexSignature
  props: string[]
}

/**
 * return a new object that do not have specified properties
 */
export default ({ obj, props }: _Props) => {
  try {
    const filteredObj = Object.keys(obj).reduce(
      (newObj: _IndexSignature, currentKey) => {
        if (!props.includes(currentKey)) newObj[currentKey] = obj[currentKey]
        return newObj
      },
      {}
    )
    return filteredObj
  } catch (error) {
    root.logError({
      section: "root/utils",
      summary: "could not filter out props from passed object",
      where: "helpers/utils/_filterProps.ts",
      stack: error,
    })
  }
}
