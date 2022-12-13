import { createStyles } from "@mantine/core"

import { Logo } from "../ui/Logo"

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
}))

export const Header: React.FC = () => {
  const { classes } = useStyles()

  return (
    <div className={classes.header}>
      <div className={classes.logoContainer}>
        <Logo></Logo>
      </div>
    </div>
  )
}
