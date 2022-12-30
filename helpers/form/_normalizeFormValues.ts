import { root } from "../root"

interface _ObjSignature {
  [key: string]: any
}

export default (rawBody: _ObjSignature) => {
  const body = Object.keys(rawBody).reduce(
    (obj: _ObjSignature, currentValue) => {
      /** if field is a date format the date to use utc +2 time */
      if (rawBody[currentValue] instanceof Date) {
        obj[currentValue] = root.dateFormat(rawBody[currentValue])
        /** else do not modify the field */
      } else {
        obj[currentValue] = rawBody[currentValue]
      }
      return obj
    },
    {}
  )

  console.log(5555, body)
  return body
}
