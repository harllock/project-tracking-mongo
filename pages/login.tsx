import { Button, createStyles, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { getSession, signIn } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useAtom } from "jotai"

import { root } from "../helpers/root"
import { messageAtom } from "../store"

const useStyles = createStyles(() => ({
  login: {
    width: "25%",
    display: "flex",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
  controls: {
    display: "flex",
    justifyContent: "right",
  },
}))

const Form: React.FC = () => {
  const { classes } = useStyles()
  const router = useRouter()
  const [, messageSet] = useAtom(messageAtom)

  const form = useForm({
    initialValues: { email: "", password: "" },
  })

  interface _FormValues {
    email: string
    password: string
  }

  const onSubmitHandler = async (formValues: _FormValues) => {
    const email = formValues.email
    const password = formValues.password

    /**
     * signIn is a NextAuth client side only method
     * it start the signing flow
     */
    const res = await signIn("credentials", {
      /**
       * do not use the NextAuth default redirection;
       * we handle it manually from here
       */
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      root.logError({
        section: "pages",
        summary: "NextAuth signIn method return an error",
        where: "/pages/login.tsx",
        stack: res.error,
      })
      /** override NextAuth error with app message error format */
      return messageSet({ status: "error", text: "Invalid credentials" })
    }

    /**
     * if res has no errors the session is created and we get it
     * using getSession method (useSession is used only inside component)
     */
    const session = await getSession()
    const userName = session?.user?.name.replace(/^./, (firstLetter) =>
      firstLetter.toUpperCase()
    )
    const userRole = session?.user?.role

    if (userRole === "admin") {
      /** if role is admin redirect to root (customers page) */
      router.replace("/")
      return messageSet({ status: "success", text: `Welcome ${userName}` })
    }
    if (userRole === "user") {
      /** if role is user redirect to activities page */
      router.replace("/activities")
      return messageSet({ status: "success", text: `Welcome ${userName}` })
    }
  }

  return (
    <form className={classes.form} onSubmit={form.onSubmit(onSubmitHandler)}>
      <TextInput
        required
        label="Email"
        {...form.getInputProps("email")}
        mb={"sm"}
      ></TextInput>
      <PasswordInput
        required
        label="Password"
        {...form.getInputProps("password")}
        mb={"sm"}
      ></PasswordInput>
      <div className={classes.controls}>
        <Button type="submit">Login</Button>
      </div>
    </form>
  )
}

const Login: React.FC = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.login}>
      <Head>
        <title>login</title>
      </Head>
      <Form></Form>
    </div>
  )
}

export default Login
