import authCompareHash from "./auth/_compareHash"
import authHashPassword from "./auth/_hashPassword"
import dateFormat from "./date/_format"
import dbCreateMagicSearchField from "./db/_createMagicSearchField"
import formSetInitialValues from "./form/_setInitialValues"
import formNormalizeFormValues from "./form/_normalizeFormValues"
import httpPost from "./http/_post"
import logError from "./log/_error"
import messageContactSupport from "./message/_contactSupport"
import messageUnauthenticatedRequest from "./message/_unauthenticateRequest"
import useSearch from "./hooks/useSearch"
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
  formSetInitialValues,
  formNormalizeFormValues,

  /** http methods */
  httpPost,

  /** logs */
  logError,

  /** messages */
  messageContactSupport,
  messageUnauthenticatedRequest,

  /** hooks */
  useSearch,

  /** utils */
  utilsFilterProps,
}
