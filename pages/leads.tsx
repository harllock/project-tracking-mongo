import Head from "next/head"
import { getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"

import { InfoBar } from "../components/sections/InfoBar"
import { Main } from "../components/sections/Main"
import { useSearch } from "../hooks/useSearch"

import { config } from "../config"
import { _Meta } from "../types/interfaces/_Meta"

const Lead: React.FC = () => {
  const meta = config.lead

  /** every time page renders atoms will be filled with fetched data */
  useSearch(meta)

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

export default Lead

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } }
  }

  if (session.user.role === "admin") {
    return { props: { session } }
  }

  if (session.user.role === "user") {
    return { redirect: { destination: "/activities", permanent: false } }
  }
}
