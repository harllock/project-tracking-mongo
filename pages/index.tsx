import Head from "next/head"
import { getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"

import { InfoBar } from "../components/sections/InfoBar"
import { Main } from "../components/sections/Main"

import { config } from "../config"
import { root } from "../helpers/root"
import { _Meta } from "../types/interfaces/_Meta"

const Customer: React.FC = () => {
  const meta = config.customer

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

export default Customer

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } }
  }

  if (session.user.role === "admin") {
    return { props: { session } }
  }

  if (session.user.role === "user") {
    return {
      props: { session },
      redirect: { destination: "/", permanent: false },
    }
  }
}
