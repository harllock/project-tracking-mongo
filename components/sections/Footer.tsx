import { createStyles } from "@mantine/core"

import { global } from "../../config"

const colors = global.colors

const useStyles = createStyles((theme) => ({
  footer: {
    height: 70,
    minHeight: 70,
    width: "100%",
    display: "flex",
    alignItems: "center",
    background: colors.blue,
  },
}))

export const Footer: React.FC = () => {
  const { classes } = useStyles()

  return <div className={classes.footer}>Footer</div>
}
