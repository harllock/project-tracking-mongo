import Head from "next/head"
import { useAtom } from "jotai"
import { Button } from "@mantine/core"

import { config } from "../config"
import { root } from "../helpers/root"
import { dataAtom, testAtom } from "../store"

const { customer: meta } = config

const Customer: React.FC = () => {
  const [data] = useAtom(dataAtom)
  const [test, testSet] = useAtom(testAtom)

  root.useSearch()

  return (
    <>
      <Head>
        <title>{meta.page}</title>
      </Head>
      <p>test: {JSON.stringify(test)} -</p>
      <p>InfoBar</p>
      <p>Resource</p>
      <div>{JSON.stringify(data)}</div>
      <Button onClick={() => testSet(!test)}></Button>
    </>
  )
}

export default Customer
