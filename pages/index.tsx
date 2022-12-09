import Head from "next/head"

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
      <InfoBar meta={meta}></InfoBar>
      <Main meta={meta}></Main>
    </>
  )
}

export default Customer
