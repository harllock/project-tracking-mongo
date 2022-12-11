interface _Props {
  obj: { [key: string]: string }
  prop: string
}

interface _NewObj {
  [key: string]: string
}

/**
 * return a new that do not have specified property
 */
export default ({ obj, prop }: _Props) => {
  const filteredObj = Object.keys(obj).reduce((newObj: _NewObj, currentKey) => {
    if (currentKey !== prop) newObj[currentKey] = obj[currentKey]
    return newObj
  }, {})

  return filteredObj
}
