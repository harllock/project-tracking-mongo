import formSetInitialValues from "./form/_setInitialValues"
import httpPost from "./http/_post"
import logError from "./log/_error"
import messageContactSupport from "./message/_contactSupport"
import useSearch from "./hooks/useSearch"

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
}
