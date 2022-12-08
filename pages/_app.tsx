import { AppProps } from "next/app"
import Head from "next/head"
import { MantineProvider, MantineThemeOverride } from "@mantine/core"

import Root from "../components/sections/Root"
import Content from "../components/sections/Content"
import Header from "../components/sections/Header"
import Footer from "../components/sections/Footer"

const customTheme: MantineThemeOverride = {
  colorScheme: "light",
  black: "#4b4d52",
  datesLocale: "it",
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={customTheme}>
        <Root>
          <Header></Header>
          <Content>
            <Component {...pageProps} />
          </Content>
          <Footer></Footer>
        </Root>
      </MantineProvider>
    </>
  )
}
