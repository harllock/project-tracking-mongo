import { useEffect } from "react"
import { useAtom } from "jotai"

import { root } from "../root"
import { dataAtom, refreshDataAtom } from "../../store"

export default () => {
  const [, dataSet] = useAtom(dataAtom)
  const [refreshData] = useAtom(refreshDataAtom)

  useEffect(() => {
    ;(async () => {
      const body = {}
      const result = await root.httpPost(`/api/customers/search`, body)
      dataSet(result)
    })()
  }, [refreshData])
}
