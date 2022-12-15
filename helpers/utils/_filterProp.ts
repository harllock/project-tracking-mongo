interface _Props {
  obj: { [key: string]: string }
  props: string[]
}

interface _NewObj {
  [key: string]: string
}

/**
 * return a new that do not have specified property
 */
export default ({ obj, props }: _Props) => {
  const filteredObj = Object.keys(obj).reduce((newObj: _NewObj, currentKey) => {
    if (!props.includes(currentKey)) newObj[currentKey] = obj[currentKey]
    return newObj
  }, {})

  return filteredObj
}
