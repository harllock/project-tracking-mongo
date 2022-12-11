import formSetInitialValues from "./form/_setInitialValues"
import httpPost from "./http/_post"
import logError from "./log/_error"
import messageContactSupport from "./message/_contactSupport"
import useSearch from "./hooks/useSearch"
import utilsFilterProp from "./utils/_filterProp"

export const root = {
  /** forms */
  formSetInitialValues,

  /** http methods */
  httpPost,

  /** logs */
  logError,

  /** messages */
  messageContactSupport,

  /** hooks */
  useSearch,

  /** utils */
  utilsFilterProp,
}
