import { useEffect } from "react"
import { useAtom } from "jotai"

import { dataAtom } from "../../store"

const UseSearch = () => {
  const [, dataSet] = useAtom(dataAtom)

  useEffect(() => {
    ;(async () => {
      const body = {}
      const result = await _post(`/api/customers/search`, body)
      dataSet(result)
    })()
  }, [])
}

export default UseSearch

async function _post(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const result = await res.json()
  return result
}
