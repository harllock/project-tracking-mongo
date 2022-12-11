import { root } from "../root"
import { _FormField } from "../../components/interfaces/_FormField"

interface _Props {
  fields: _FormField[]
  selectedRow?: {} | null
}

/**
 * example of fields array
 * [
 *  {key: 'country', header: 'Country'},
 *  {key: 'address', header: 'Address'},
 * ]
 *
 * example of selectedRow object
 * {country: 'italy', address: 'via roma', ...},
 * ]
 */

export default ({ fields, selectedRow = null }: _Props) => {
  try {
    if (selectedRow)
      return _setInitialValueForFormUpdateDelete(fields, selectedRow)
    else return _setInitialValueForFormCreate(fields)
  } catch (error: any) {
    root.logError({
      section: "root/form",
      summary: "could not set initial value for the form",
      where: "helpers/form/_setInitialValues.js",
      stack: error,
    })
  }
}

interface _PreviousValue {
  [key: string]: string
}

/**
 * FormUpdateDelete case:
 * using fields and selectedRow return a new object like this:
 * {country: 'italy', address: 'via roma', ...}
 */
function _setInitialValueForFormUpdateDelete(
  fields: _FormField[],
  selectedRow: { [key: string]: string }
): {} {
  // Object.keys(selectedRow).forEach((key) => {
  //   if (key === "_id") delete selectedRow[key]
  // })

  return selectedRow
}

/**
 * FormCreate case:
 * return a new object like this:
 * {country: '', address: '', ...}
 */
function _setInitialValueForFormCreate(fields: _FormField[]): {} {
  const emptyFields = fields.reduce(
    (previousValue: _PreviousValue, currentValue) => {
      previousValue[currentValue.key] = ""
      return previousValue
    },
    {}
  )
  return emptyFields
}
