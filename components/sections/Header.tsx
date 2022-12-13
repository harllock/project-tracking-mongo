import { Anchor, createStyles } from "@mantine/core"
import Link from "next/link"
import { useAtom } from "jotai"

import { Logo } from "../ui/Logo"

import { selectedRowAtom } from "../../store"

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

  const [, selectedRowSet] = useAtom(selectedRowAtom)

  const onClickHandler = async () => {
    selectedRowSet({})
  }

  const AdminLinks = () => {
    return (
      <>
        <Link href="/" className={classes.link}>
          Customers
        </Link>
      </>
    )
  }

  return (
    <div className={classes.header}>
      <div className={classes.logoContainer}>
        <Logo></Logo>
      </div>
      <div className={classes.linkContainer}>{AdminLinks()}</div>
    </div>
  )
}
