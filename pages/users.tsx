import Head from "next/head"

import { InfoBar } from "../components/sections/InfoBar"
import { Main } from "../components/sections/Main"

import { config } from "../config"
import { root } from "../helpers/root"
import { _Meta } from "../types/interfaces/_Meta"

const User: React.FC = () => {
  const meta = config.user

  root.useSearch(meta)

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

export default User
