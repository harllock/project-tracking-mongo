import { useEffect } from "react"
import { useAtom } from "jotai"

import { root } from "../helpers/root"
import { _Meta } from "../types/interfaces/_Meta"
import {
  dataAtom,
  magicSearchAtom,
  mainGaugesAtom,
  messageAtom,
  offsetAtom,
  refreshDataAtom,
} from "../store"

export const useSearch = (meta: _Meta) => {
  const resourcePage = meta.page
  const [, dataSet] = useAtom(dataAtom)
  const [magicSearch] = useAtom(magicSearchAtom)
  const [, mainGaugesSet] = useAtom(mainGaugesAtom)
  const [, messageSet] = useAtom(messageAtom)
  /** offset is set by Pagination component */
  const [offset] = useAtom(offsetAtom)
  const [refreshData] = useAtom(refreshDataAtom)

  useEffect(() => {
    const body = { offset, magicSearch }

    const _fetchData = async () => {
      const result = await root.httpPost(`/api/${resourcePage}/search`, body)

      /**
       * if apis return an error object set the client side message
       * and return an empty data array and count 0
       */
      if (result?.status === "error") {
        messageSet(result)
        return { data: [], count: 0 }
      }

      return result
    }

    if (magicSearch) {
      /**
       * is user is typing in search field, slow down data fetching for 1 second;
       * as soon as user types a character in search field this useEffect is
       * triggered, but since the fetching is delayed, if user types another
       * character before timeout expires, useEffect will render again and
       * cleanup function clear the previous timer before it can fetch any data
       */
      const timer = setTimeout(async () => {
        const { data, count } = await _fetchData()
        dataSet(data)
        mainGaugesSet({ count })
      }, 1000)
      return () => {
        clearTimeout(timer)
      }
      /** if search field is empty data are fetched immediately without delay */
    } else {
      ;(async () => {
        const { data, count } = await _fetchData()
        dataSet(data)
        mainGaugesSet({ count })
      })()
    }
  }, [magicSearch, offset, refreshData])
}
