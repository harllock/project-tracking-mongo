import { root } from "../root"

interface _Props {
  body: { [key: string]: any }
  noSearchFields: string[]
}

/**
 * @params {Object} props
 * @params {object} props.body - body from client side request
 * @params {array} props.noSearchFields - list of body fields that will not
 * be used for magicSearchField
 */
export default ({ body, noSearchFields }: _Props): string => {
  try {
    /**
     * filteredObj only have properties that will used for magicSearchField
     */
    const filteredObj = root.utilsFilterProps({
      obj: body,
      props: noSearchFields,
    })

    /** if utils.FilterProps did not work throw an error */
    if (!filteredObj) throw new Error("could not create magicSearchField")

    /**
     * join all filteredObj properties values to create the magicSearchField;
     * ex: "Barilla via genova 12 rome italy IT12341241223"
     */
    const magicSearchField = Object.values(filteredObj)
      /** remove empty string values */
      .filter((value) => value !== "")
      .join(" ")

    return magicSearchField
  } catch (error) {
    root.logError({
      section: "root/db",
      summary: "could create the magicSearchField value",
      where: "helpers/db/_createMagicSearchField.ts",
      stack: error,
    })
    return ""
  }
}
