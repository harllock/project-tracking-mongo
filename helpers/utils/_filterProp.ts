import { ObjectId } from "mongodb"

interface _IndexSignature {
  [key: string]: string | ObjectId | undefined
}

interface _Props {
  obj: _IndexSignature
  props: string[]
}

/**
 * return a new that do not have specified property
 */
export default ({ obj, props }: _Props) => {
  const filteredObj = Object.keys(obj).reduce(
    (newObj: _IndexSignature, currentKey) => {
      if (!props.includes(currentKey)) newObj[currentKey] = obj[currentKey]
      return newObj
    },
    {}
  )

  return filteredObj
}
