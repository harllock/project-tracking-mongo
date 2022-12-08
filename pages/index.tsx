import Head from "next/head"
import { useAtom } from "jotai"

import { config } from "../config"
import { root } from "../helpers/root"

import InfoBar from "../components/sections/InfoBar"
import Main from "../components/sections/Main"

const { customer: meta } = config

const Customer: React.FC = () => {
  root.useSearch()

  return (
    <>
      <Head>
        <title>{meta.page}</title>
      </Head>
      <InfoBar></InfoBar>
      <Main></Main>
    </>
  )
}

export default Customer
