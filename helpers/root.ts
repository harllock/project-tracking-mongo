import authCompareHash from "./auth/_compareHash"
import authHashPassword from "./auth/_hashPassword"
import dateFormat from "./date/_format"
import dbCreateMagicSearchField from "./db/_createMagicSearchField"
import formCreateBody from "./form/_createBody"
import formSetInitialValues from "./form/_setInitialValues"
import httpPost from "./http/_post"
import logError from "./log/_error"
import messageContactSupport from "./message/_contactSupport"
import messageUnauthenticatedRequest from "./message/_unauthenticateRequest"
import utilsFilterProps from "./utils/_filterProps"

export const root = {
  /** authentication */
  authCompareHash,
  authHashPassword,

  /** dates */
  dateFormat,

  /** database */
  dbCreateMagicSearchField,

  /** forms */
  formCreateBody,
  formSetInitialValues,

  /** http methods */
  httpPost,

  /** logs */
  logError,

  /** messages */
  messageContactSupport,
  messageUnauthenticatedRequest,

  /** utils */
  utilsFilterProps,
}
