import { useEffect } from "react"
import { useAtom } from "jotai"

import { root } from "../root"
import {
  dataAtom,
  mainGaugesAtom,
  offsetAtom,
  refreshDataAtom,
} from "../../store"

export default () => {
  const [, dataSet] = useAtom(dataAtom)
  const [, mainGaugesSet] = useAtom(mainGaugesAtom)
  /** offset is set by Pagination component */
  const [offset] = useAtom(offsetAtom)
  const [refreshData] = useAtom(refreshDataAtom)

  useEffect(() => {
    ;(async () => {
      const body = { offset }
      const { data, count } = await root.httpPost(`/api/customers/search`, body)
      dataSet(data)
      mainGaugesSet({ count })
    })()
  }, [offset, refreshData])
}
