import { useEffect } from "react"
import { useAtom } from "jotai"

import { root } from "../root"
import { dataAtom, mainGaugesAtom, refreshDataAtom } from "../../store"

export default () => {
  const [, dataSet] = useAtom(dataAtom)
  const [, mainGaugesSet] = useAtom(mainGaugesAtom)
  const [refreshData] = useAtom(refreshDataAtom)

  useEffect(() => {
    ;(async () => {
      const body = {}
      const { data, count } = await root.httpPost(`/api/customers/search`, body)
      dataSet(data)
      mainGaugesSet({ count })
    })()
  }, [refreshData])
}
