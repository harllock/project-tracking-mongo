import { root } from "../root"
import { _FormField } from "../../types/interfaces/_FormField"

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
  } catch (error) {
    root.logError({
      section: "root/form",
      summary: "could not set initial value for the form",
      where: "helpers/form/_setInitialValues.ts",
      stack: error,
    })
  }
}

/** FormUpdateDelete */
function _setInitialValueForFormUpdateDelete(
  fields: _FormField[],
  selectedRow: { [key: string]: string }
): {} {
  return selectedRow
}

/**
 * FormCreate:
 * return a new object like this:
 * {country: '', address: '', ...}
 */
interface _Obj {
  [key: string]: string
}
/**
 * set default FormCreate values for mantine form fields;
 * even if some fields are hidden in FormCreate their value is set here
 */
function _setInitialValueForFormCreate(fields: _FormField[]): {} {
  const initializedFields = fields.reduce((obj: _Obj, currentValue) => {
    /**
     * if current field has a default value set it as field value
     * ex: status field has default value of "open"
     */
    if (currentValue.default) obj[currentValue.key] = currentValue.default
    /**
     *  set remaing fields to empty string
     */ else obj[currentValue.key] = ""
    return obj
  }, {})
  return initializedFields
}
