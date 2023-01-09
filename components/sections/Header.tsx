import { createStyles } from "@mantine/core"
import Link from "next/link"
import { useAtom } from "jotai"
import { signOut, useSession } from "next-auth/react"

import { Logo } from "../ui/Logo"

import {
  dataAtom,
  magicSearchAtom,
  offsetAtom,
  refreshDataAtom,
  selectedRowAtom,
} from "../../store"

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.blue[8],
    height: 70,
    minHeight: 70,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoContainer: {
    width: "20%",
    marginLeft: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  linkContainer: {
    width: "80%",
    marginLeft: "20px",
    marginRight: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    display: "flex",
    justifyContent: "space-between",
  },

  link: {
    color: "white",
    fontWeight: "bold",
  },
}))

export const Header: React.FC = () => {
  const { classes } = useStyles()

  const [, dataSet] = useAtom(dataAtom)
  const [, magicSearchSet] = useAtom(magicSearchAtom)
  const [, offsetSet] = useAtom(offsetAtom)
  const [refreshData, refreshDataSet] = useAtom(refreshDataAtom)
  const [, selectedRowSet] = useAtom(selectedRowAtom)

  const { data: session, status } = useSession()

  const onClickHandler = () => {
    dataSet([{}])
    selectedRowSet({})
    magicSearchSet("")
    offsetSet(0)
    /**
     * refresh atom is needed for case when user click on the header link of
     * the page he is already on top of
     */
    refreshDataSet(!refreshData)
  }

  const onSignOutHandler = () => {
    selectedRowSet({})
    magicSearchSet("")
    offsetSet(0)
    signOut()
  }

  const AdminLinks = () => {
    return (
      <>
        <Link href="/" className={classes.link} onClick={onClickHandler}>
          Customers
        </Link>
        <Link href="/users" className={classes.link} onClick={onClickHandler}>
          Users
        </Link>
        <Link
          href="/projects"
          className={classes.link}
          onClick={onClickHandler}
        >
          Projects
        </Link>
        <Link href="/leads" className={classes.link} onClick={onClickHandler}>
          Lead
        </Link>
        <Link href="/login" className={classes.link} onClick={onSignOutHandler}>
          Sign Out
        </Link>
      </>
    )
  }

  const UserLinks = () => {
    return (
      <>
        <Link href="/" className={classes.link} onClick={onClickHandler}>
          Customers
        </Link>
        <Link href="/users" className={classes.link} onClick={onClickHandler}>
          Users
        </Link>
        <Link href="/leads" className={classes.link} onClick={onClickHandler}>
          Lead
        </Link>
        <Link href="/login" className={classes.link} onClick={onSignOutHandler}>
          Sign Out
        </Link>
      </>
    )
  }

  return (
    <div className={classes.header}>
      <div className={classes.logoContainer}>
        <Logo></Logo>
      </div>
      <div className={classes.linkContainer}>
        {status === "unauthenticated" || status === "loading" ? (
          ""
        ) : session?.user.role === "admin" ? (
          <AdminLinks></AdminLinks>
        ) : (
          <UserLinks></UserLinks>
        )}
      </div>
    </div>
  )
}
