import authCompareHash from "./auth/_compareHash"
import authHashPassword from "./auth/_hashPassword"
import dbCreateMagicSearchField from "./db/_createMagicSearchField"
import formSetInitialValues from "./form/_setInitialValues"
import httpPost from "./http/_post"
import logError from "./log/_error"
import messageContactSupport from "./message/_contactSupport"
import useSearch from "./hooks/useSearch"
import utilsFilterProps from "./utils/_filterProps"

export const root = {
  /** authentication */
  authCompareHash,
  authHashPassword,

  /** database */
  dbCreateMagicSearchField,

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
  utilsFilterProps,
}
