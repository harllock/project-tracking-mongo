import { useEffect } from "react"
import { useAtom } from "jotai"

import { dataAtom, testAtom } from "../../store"

const UseSearch = () => {
  const [, dataSet] = useAtom(dataAtom)
  const [test] = useAtom(testAtom)

  useEffect(() => {
    ;(async () => {
      const body = {}
      const result = await _post(`/api/customers/search`, body)
      console.log(1111, result)
      dataSet({ a: Math.random() })
    })()
  }, [test])
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
